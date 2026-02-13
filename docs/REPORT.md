# IC-PROJ — Report

Project: Interview Crackers (IC-PROJ)

Overview
- MERN stack application with role-based access control (user, admin, superadmin)
- JWT authentication, admin approval workflow, question CRUD, SuperAdmin EJS panel

Completed Features
- Backend:
  - JWT authentication with `bcrypt` password hashing (`/api/auth` endpoints)
  - Admin approval workflow stored in `adminapprovalrequests` collection
  - Role middleware and protected routes
  - Question CRUD endpoints
  - SuperAdmin server-side UI (EJS) to approve/reject admin requests
  - Seeder to create a `superadmin` user (`npm run seed`)

- Frontend (scaffold):
  - Vite + React + Tailwind setup files
  - Auth context and API wrapper (axios interceptor)
  - Router and placeholder pages (Home, Login, Register, Dashboard)

Database
- MongoDB database name: `project_interview_crackers` (local or Atlas)

How to run
1. Backend
```bash
cd backend
npm install
npm run seed     # optional: create superadmin
npm run dev
```

2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Security Notes
- Passwords are hashed with `bcrypt` in the backend.
- JWT secrets must be set in `.env` and kept secret.
- Add `express-rate-limit` and `helmet` for production.

Limitations & Next Steps
- Frontend forms need to be fully implemented and validated.
- Add tests and CI.
- Add refresh tokens and logout server-side invalidation if desired.

Mapping to Epics/Stories
- EPIC 1: Authentication & User Management — implemented core register/login/forgot/reset and admin approval
- EPIC 2: Question Management System — question CRUD implemented on backend; frontend pages scaffolded
- EPIC 3: Dashboard & UI — scaffolded; theme toggle and time-tracking require frontend work
- EPIC 4: Security & Backend Structure — MVC pattern and JWT middleware implemented
- EPIC 5: SuperAdmin Panel — EJS pages implemented for login/dashboard/pending approval

Contact
If you'd like I can continue by wiring frontend forms, adding theme toggle, or adding automated tests. Tell me which next task you prefer.
