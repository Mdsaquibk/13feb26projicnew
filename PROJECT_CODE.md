# Full Project Code and Report

This file contains the complete backend and frontend code (scaffolded), plus a short run/report guide.

---

## Backend (Node + Express + MongoDB)

### File: backend/server.js
```js
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./src/config/db');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/questions', require('./src/routes/questionRoutes'));
app.use('/superadmin', require('./src/routes/superAdminRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

### File: backend/package.json
```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "license": "ISC",
  "author": "",
  "type": "commonjs",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

### File: backend/.env (example)
```text
PORT=8080
MONGO_URI=mongodb://localhost:27017/project_interview_crackers
JWT_SECRET=suhelsaquib160598
EMAIL_USER=saquibm060@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=saquibm060@gmail.com
ALLOWED_ORIGIN=http://localhost:5173
```

---

### File: backend/src/config/db.js
```js
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/project_interview_crackers';
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

### File: backend/src/config/email.js
```js
const nodemailer = require('nodemailer');

let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

const sendEmail = async (to, subject, text, html) => {
  if (!transporter) {
    console.log('Email fallback. To:', to, 'Subject:', subject, 'Text:', text);
    return;
  }
  await transporter.sendMail({ from: process.env.EMAIL_FROM || process.env.EMAIL_USER, to, subject, text, html });
};

module.exports = { sendEmail };
```

---

### Models

#### File: backend/src/models/User.js
```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  gender: { type: String },
  mobileNo: { type: String },
  role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' },
  yop: { type: Date },
  course: { type: String },
  isApproved: { type: Boolean, default: false },
  mustChangePassword: { type: Boolean, default: false },
  resetOTP: { type: String },
  resetOTPExpires: { type: Date },
  resetVerified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

#### File: backend/src/models/Question.js
```js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  course: { type: String },
  difficulty: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
```

#### File: backend/src/models/AdminApprovalRequest.js
```js
const mongoose = require('mongoose');

const adminApprovalSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('AdminApprovalRequest', adminApprovalSchema);
```

---

### Controllers (key endpoints)

#### File: backend/src/controllers/authController.js
```js
const User = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../config/email');

const signToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  try {
    const { username, email, password, course } = req.body;
    const user = await User.create({ username, email, password, course, isApproved: true });
    const token = signToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Note: real app must verify hashed password. Scaffold skips it.
    const token = signToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetOTP = otp;
  user.resetOTPExpires = Date.now() + 15 * 60 * 1000;
  await user.save();
  await sendEmail(email, 'Your OTP', `OTP: ${otp}`, `<p>OTP: ${otp}</p>`);
  res.json({ ok: true });
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.resetOTP !== otp || user.resetOTPExpires < Date.now()) return res.status(400).json({ error: 'Invalid or expired OTP' });
  user.resetVerified = true;
  await user.save();
  res.json({ ok: true });
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.resetVerified) return res.status(400).json({ error: 'Not verified' });
  user.password = newPassword; // hash in real app
  user.resetOTP = undefined; user.resetOTPExpires = undefined; user.resetVerified = false;
  await user.save();
  res.json({ ok: true });
};

exports.changePassword = async (req, res) => {
  const { id } = req.user || {};
  const { oldPassword, newPassword } = req.body;
  if (!id) return res.status(401).json({ error: 'Unauthorized' });
  const user = await User.findById(id);
  // Skip checking oldPassword in scaffold
  user.password = newPassword;
  await user.save();
  res.json({ ok: true });
};
```

#### File: backend/src/controllers/questionController.js
```js
const Question = require('../models/Question');

exports.add = async (req, res) => {
  const { title, description, course, difficulty } = req.body;
  const q = await Question.create({ title, description, course, difficulty, createdBy: req.user && req.user.id });
  res.status(201).json(q);
};

exports.list = async (req, res) => {
  const { course } = req.query;
  const filter = {};
  if (course) filter.course = course;
  const qs = await Question.find(filter).limit(100);
  res.json(qs);
};

exports.update = async (req, res) => {
  const q = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(q);
};

exports.remove = async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
```

#### File: backend/src/controllers/superAdminController.js
```js
const AdminApprovalRequest = require('../models/AdminApprovalRequest');
const User = require('../models/User');

exports.showLogin = (req, res) => res.render('superadmin/login', { error: null });

exports.dashboard = async (req, res) => {
  const pending = await AdminApprovalRequest.find({ status: 'pending' }).populate('adminId');
  res.render('superadmin/dashboard', { pending });
};

exports.pendingAdmins = async (req, res) => {
  const pending = await AdminApprovalRequest.find({ status: 'pending' }).populate('adminId');
  res.render('superadmin/pendingAdmins', { pending });
};

exports.approve = async (req, res) => {
  const reqDoc = await AdminApprovalRequest.findById(req.params.id);
  if (!reqDoc) return res.status(404).send('Not found');
  reqDoc.status = 'approved';
  await reqDoc.save();
  await User.findByIdAndUpdate(reqDoc.adminId, { isApproved: true, role: 'admin' });
  res.redirect('/superadmin/dashboard');
};

exports.reject = async (req, res) => {
  const reqDoc = await AdminApprovalRequest.findById(req.params.id);
  if (!reqDoc) return res.status(404).send('Not found');
  reqDoc.status = 'rejected';
  await reqDoc.save();
  res.redirect('/superadmin/dashboard');
};
```

---

### Routes

#### File: backend/src/routes/authRoutes.js
```js
const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/forgot-password', auth.forgotPassword);
router.post('/verify-otp', auth.verifyOTP);
router.post('/reset-password', auth.resetPassword);
router.post('/change-password', auth.changePassword);

module.exports = router;
```

#### File: backend/src/routes/questionRoutes.js
```js
const express = require('express');
const router = express.Router();
const qc = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, qc.add);
router.get('/', qc.list);
router.put('/:id', protect, qc.update);
router.delete('/:id', protect, qc.remove);

module.exports = router;
```

#### File: backend/src/routes/superAdminRoutes.js
```js
const express = require('express');
const router = express.Router();
const sa = require('../controllers/superAdminController');

router.get('/login', sa.showLogin);
router.get('/dashboard', sa.dashboard);
router.get('/pending-admins', sa.pendingAdmins);
router.post('/approve/:id', sa.approve);
router.post('/reject/:id', sa.reject);

module.exports = router;
```

---

### Middleware

#### File: backend/src/middleware/authMiddleware.js
```js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No auth token' });
  try {
    const token = auth.split(' ')[1] || auth;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    req.user = { id: user._id, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

#### File: backend/src/middleware/roleMiddleware.js
```js
exports.requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) return res.status(403).json({ error: 'Forbidden' });
  next();
};
```

---

### Utils

#### File: backend/src/utils/generateOTP.js
```js
module.exports = function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
```

---

### EJS Views (SuperAdmin)

#### File: backend/src/views/superadmin/login.ejs
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>SuperAdmin Login</title>
  </head>
  <body>
    <h1>SuperAdmin Login</h1>
    <% if (error) { %>
      <p style="color:red"><%= error %></p>
    <% } %>
    <form method="POST" action="/superadmin/login">
      <label>Email: <input name="email" /></label>
      <label>Password: <input name="password" type="password" /></label>
      <button type="submit">Login</button>
    </form>
  </body>
</html>
```

#### File: backend/src/views/superadmin/dashboard.ejs
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>SuperAdmin Dashboard</title>
  </head>
  <body>
    <h1>Dashboard</h1>
    <a href="/superadmin/pending-admins">Pending Admin Requests</a>
    <h2>Pending Requests</h2>
    <ul>
      <% pending.forEach(function(p) { %>
        <li><%= p.adminId.email %> - <%= p.status %></li>
      <% }) %>
    </ul>
  </body>
</html>
```

#### File: backend/src/views/superadmin/pendingAdmins.ejs
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Pending Admins</title>
  </head>
  <body>
    <h1>Pending Admin Approval Requests</h1>
    <ul>
      <% pending.forEach(function(p) { %>
        <li>
          <%= p.adminId.email %>
          <form method="POST" action="/superadmin/approve/<%= p._id %>" style="display:inline">
            <button type="submit">Approve</button>
          </form>
          <form method="POST" action="/superadmin/reject/<%= p._id %>" style="display:inline">
            <button type="submit">Reject</button>
          </form>
        </li>
      <% }) %>
    </ul>
  </body>
</html>
```

---

## Frontend (Vite + React + Tailwind)

### File: frontend/index.html
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Interview Crackers</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### File: frontend/package.json
```json
{
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^3.0.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0"
  }
}
```

### File: frontend/vite.config.js
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
```

### File: frontend/tailwind.config.cjs
```js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### File: frontend/postcss.config.cjs
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### File: frontend/src/main.jsx
```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')).render(<App />)
```

### File: frontend/src/App.jsx
```jsx
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './router/router'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  )
}
```

### File: frontend/src/router/router.jsx
```jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/user/Dashboard'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}
```

### File: frontend/src/context/AuthContext.jsx
```jsx
import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('auth')
    if (raw) setUser(JSON.parse(raw))
  }, [])

  const login = async (credentials) => {
    const res = await api.post('/auth/login', credentials)
    const { user, token } = res.data
    localStorage.setItem('auth', JSON.stringify({ user, token }))
    setUser({ user, token })
    return res
  }

  const logout = () => {
    localStorage.removeItem('auth')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
```

### File: frontend/src/services/api.js
```js
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8080/api' })

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('auth')
  if (raw) {
    const { token } = JSON.parse(raw)
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
```

### File: frontend/src/styles/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root { height: 100%; }
```

---

## Small Frontend component placeholders (create these files under `src/pages`)

File: `frontend/src/pages/Home.jsx`
```jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Interview Crackers</h1>
      <p>Home — public info, courses cards, theme toggle...</p>
      <div className="mt-4">
        <Link to="/login" className="btn">Get Started</Link>
      </div>
    </div>
  )
}
```

File: `frontend/src/pages/auth/Login.jsx`
```jsx
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const nav = useNavigate()

  const submit = async (e) =>{
    e.preventDefault()
    await login({ email, password })
    nav('/dashboard')
  }

  return (
    <form onSubmit={submit} className="p-4">
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
      <button>Login</button>
    </form>
  )
}
```

File: `frontend/src/pages/auth/Register.jsx`
```jsx
import React from 'react'
export default function Register(){
  return <div>Register form (username, email, password, course)</div>
}
```

File: `frontend/src/pages/user/Dashboard.jsx`
```jsx
import React from 'react'
export default function Dashboard(){
  return <div>User Dashboard — show stats, time spent, questions, etc.</div>
}
```

---

## Report / Run Instructions

### Project Summary
- Stack: Vite + React + Tailwind (frontend), Node + Express + MongoDB + Mongoose (backend)
- Auth: JWT stored in LocalStorage, sent via `Authorization` header
- Roles: `user`, `admin`, `superadmin` with RBAC middleware
- SuperAdmin UI: server-side rendered EJS pages under `/superadmin`
- Email: Nodemailer using Gmail SMTP (configure `EMAIL_USER`/`EMAIL_PASS`)

### Database
- MongoDB database name: `project_interview_crackers`
- Example local URL (update in `.env`): `mongodb://localhost:27017/project_interview_crackers`

### Environment file (`backend/.env`)
Set these values before running the backend:
```
PORT=8080
MONGO_URI=mongodb://localhost:27017/project_interview_crackers
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=you@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=you@gmail.com
ALLOWED_ORIGIN=http://localhost:5173
```

### Install & Run Backend
```
cd backend
npm install express mongoose dotenv ejs nodemailer jsonwebtoken
npm install --save-dev nodemon
npm run dev
```

### Install & Run Frontend
```
cd frontend
npm install
npm run dev
```

### API Base URL
- Backend API base: `http://localhost:8080/api`

### Key Endpoints
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/forgot-password`, `POST /api/auth/verify-otp`, `POST /api/auth/reset-password`, `POST /api/auth/change-password`
- Questions: `POST /api/questions/add`, `GET /api/questions`, `PUT /api/questions/:id`, `DELETE /api/questions/:id`
- Admin: `GET /api/admin/users`, `GET /api/admin/questions` (need to add controllers if desired)
- SuperAdmin (EJS): `/superadmin/login`, `/superadmin/dashboard`, `/superadmin/pending-admins`, `/superadmin/approve/:id`, `/superadmin/reject/:id`

### Notes & Next Steps
- Passwords are stored/handled plainly in this scaffold — implement hashing with `bcrypt` before production.
- Add input validation (e.g., `express-validator`) and rate limiting.
- Implement real email templates and proper error handling.
- Seed a `superadmin` user or create a CLI script to create one.
- Add unit and integration tests.

---

## Files created in the workspace
- backend/ (server, src/..., public/)
- frontend/ (Vite app scaffold)
- PROJECT_CODE.md (this file)

If you want, I can now:
- commit these files to git and create an initial commit,
- install and run both apps locally and report runtime logs,
- or implement password hashing + JWT refresh tokens.

Tell me which next step you want. 
