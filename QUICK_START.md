# 🎉 InterCracker - Quick Start Guide

## 📌 Current Status
**Phase 3 Implementation**: ~40-50% Complete  
**Last Updated**: February 13, 2026  
**Servers Running**: ✅ Backend (8080) & Frontend (5173)

---

## 🚀 **QUICK START**

### 1. **Start Backend**
```bash
cd backend
node server.js
# Expected: "Server running on port 8080" && "MongoDB connected"
```

### 2. **Start Frontend**
```bash
cd frontend
node node_modules/vite/bin/vite.js
# Expected: "VITE v7.3.1 ready in ... ms"
# URL: http://localhost:5173/
```

### 3. **Access the Application**
- **Home Page**: http://localhost:5173/
- **Login**: http://localhost:5173/login
- **Register**: http://localhost:5173/register

---

## 🔐 **TEST ACCOUNTS**

### SuperAdmin
```
Email: msaquib023@gmail.com
Password: 123456
```

### Admin (Needs Approval)
```
Email: sidkelvin055@gmail.com
Password: 123456
Status: Pending SuperAdmin approval
```

### Create Test User
- Go to Register page
- Fill form and submit
- Auto-login redirect happens

---

## 🗺️ **WEBSITE NAVIGATION**

### Public Pages (No Login Required)
- `/` - Home page with features
- `/about` - About InterCracker
- `/services` - Services offered
- `/contact` - Contact form
- `/faq` - FAQ accordion
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password reset

### Protected Pages (Login Required)
- `/dashboard` - User dashboard (users)
- `/admin/dashboard` - Admin panel
- `/superadmin/panel` - SuperAdmin panel

---

## ✨ **IMPLEMENTED FEATURES**

### ✅ Navbar
- 🌟 Star icon branding
- 🏠 Navigation links with icons
- 📱 Mobile responsive hamburger menu
- 👤 User avatar circle
- 🔐 Role-based buttons
- 🌙 Dark/Light mode toggle

### ✅ Authentication
- 📝 Register with validation
- 🔑 Login with role selector
- 🎯 Toast success messages
- ⏱️ Auto-redirect after registration
- 💬 Error messages

### ✅ Pages
- 🏠 Home (enhanced with stats)
- ℹ️ About page
- 🛠️ Services page
- 📧 Contact form (working)
- ❓ FAQ with accordion
- ⬆️ Back to top button

### ✅ UI/UX
- 🎨 Dark & Light theme
- 📱 Fully responsive design
- 🎭 Smooth transitions
- ⚡ Loading spinners
- 📢 Toast notifications

---

## 🔧 **PARTIALLY IMPLEMENTED**

### ⏳ Admin Dashboard
- ✅ Aside bar structure
- ✅ Question add/edit/delete
- ⏳ User management card format
- ⏳ Course filters
- ⏳ Difficulty filters

### ⏳ User Dashboard
- ✅ Question filtering
- ⏳ Profile section
- ⏳ Session tracking
- ⏳ Suggestions system
- ⏳ Like button

### ⏳ SuperAdmin Panel
- ✅ Basic structure
- ⏳ Analytics dashboard
- ⏳ Charts (recharts)
- ⏳ Daily visitors
- ⏳ Course statistics

---

## ❌ **NOT YET IMPLEMENTED**

- Forgot Password (email not configured)
- Admin approval workflow UI
- User profile editing
- Session tracking calculation
- Suggestion/comment storage
- Blacklist functionality
- Analytics charts
- Admin user management card view

---

## 📊 **API ENDPOINTS**

### ✅ Working
```
POST  /api/auth/register      - Register user
POST  /api/auth/login         - Login user
GET   /api/questions          - Get questions
POST  /api/contact/submit     - Submit contact form
```

### ⏳ Partially Working
```
POST  /api/auth/forgot-password - Request OTP (email not configured)
POST  /api/auth/verify-otp      - Verify OTP
POST  /api/auth/reset-password  - Reset with OTP
```

### ⏳ In Development
```
GET   /api/admin/users        - Get all users
DELETE /api/admin/users/:id   - Delete user
POST  /api/admin/blacklist    - Blacklist user
```

---

## 🎯 **NEXT PRIORITIES**

### Priority 1: Forgot Password
- [ ] Configure nodemailer with Gmail
- [ ] Test OTP sending
- [ ] Update frontend form

### Priority 2: Admin Dashboard
- [ ] Add aside bar styling
- [ ] User management cards
- [ ] Add/remove user functions
- [ ] Profile section

### Priority 3: User Dashboard
- [ ] Profile editing
- [ ] Session tracking display
- [ ] Suggestion form
- [ ] Like/helpful button

### Priority 4: SuperAdmin Analytics
- [ ] Integrate recharts
- [ ] Daily visitor graph
- [ ] Course distribution pie
- [ ] Visitor stats bar graph

---

## 🐛 **TROUBLESHOOTING**

### Frontend shows blank page?
```
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Check console for errors (F12)
4. Restart Vite: npm run dev
```

### Login not working?
```
1. Verify backend is running (port 8080)
2. Check email/password credentials
3. Verify user exists in database
4. Check browser console for errors
```

### Dark mode not persisting?
```
1. Check localStorage in DevTools (F12 > Application)
2. Verify key is "isDark"
3. Check theme context is applied globally
```

### Contact form not submitting?
```
1. Verify backend is running
2. Check form validation (all fields required)
3. Verify email format
4. Check MongoDB connection
```

---

## 📁 **PROJECT STRUCTURE**

```
13febprojic/
├── backend/
│   ├── src/
│   │   ├── models/ (User, Question, Contact, etc)
│   │   ├── controllers/ (auth, question, contact, etc)
│   │   ├── routes/ (auth, question, contact, etc)
│   │   └── middleware/ (auth, role)
│   ├── questions.json (72 questions)
│   ├── questionsSeeder.js
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── pages/ (Home, About, Services, Contact, FAQ, auth, admin, user, superadmin)
    │   ├── components/ (Navbar, BackToTop)
    │   ├── context/ (AuthContext, ThemeContext)
    │   ├── router/ (Router.jsx)
    │   ├── services/ (api.js)
    │   └── utils/ (validation.js)
    ├── App.jsx
    ├── main.jsx
    └── index.html
```

---

## 🔑 **IMPORTANT FEATURES**

### Dark/Light Mode
- Persists across page refreshes
- Applies to all pages
- Toggle in navbar
- Gradient backgrounds

### Responsive Design
- Mobile first approach
- Hamburger menu on mobile
- Card layouts adjust
- Touch-friendly buttons

### Toast Notifications
- Success messages
- Error handling
- Auto-dismiss (3 seconds)
- Dark/light theme aware

---

## 💡 **TIPS**

1. **For Development**:
   - Keep both servers running in separate terminals
   - Use browser DevTools (F12) for debugging
   - Clear cache if styles don't update

2. **For Testing**:
   - Create multiple test users
   - Test on different browsers
   - Check mobile responsiveness
   - Verify dark mode on all pages

3. **For Database**:
   - MongoDB must be running locally
   - Check .env for MONGO_URI
   - Use MongoDB Compass for viewing data

---

## 📞 **SUPPORT**

If you encounter issues:
1. Check the TESTING_REPORT.md for detailed tests
2. Review Phase3_Implementation_Status.md for features
3. Check server logs for errors
4. Clear browser cache and hard refresh
5. Verify all environment variables in .env

---

## ✅ **VERIFICATION CHECKLIST**

Before proceeding with more features:
- [ ] Backend server starts without errors
- [ ] Frontend loads on localhost:5173
- [ ] Can register and login
- [ ] Dark mode toggles and persists
- [ ] Can contact form and submit
- [ ] Navbar is responsive on mobile
- [ ] No console errors in DevTools

---

**Happy Testing! 🎉**

If you need the implementation to continue on any specific feature, let me know!

