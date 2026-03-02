IC-PROJ (Interview Crackers)

Files added/modified:
- backend/server.js
- backend/package.json
- backend/.env (example)
- backend/src/config/db.js
- backend/src/config/email.js
- backend/src/models/User.js
- backend/src/models/Question.js
- backend/src/models/AdminApprovalRequest.js
- backend/src/controllers/authController.js
- backend/src/controllers/questionController.js
- backend/src/controllers/superAdminController.js
- backend/src/controllers/adminController.js
- backend/src/routes/authRoutes.js
- backend/src/routes/questionRoutes.js
- backend/src/routes/superAdminRoutes.js
- backend/src/routes/adminRoutes.js
- backend/src/middleware/authMiddleware.js
- backend/src/middleware/roleMiddleware.js
- backend/src/utils/generateOTP.js
- backend/src/utils/seedSuperadmin.js
- backend/src/views/superadmin/*.ejs
- backend/public/*
- frontend/ (scaffolded files)
- PROJECT_CODE.md

Status:
- Backend scaffold: core features implemented (auth with bcrypt+JWT, admin approval workflow, seeder, admin APIs)
- Frontend scaffold: Vite + React + Tailwind placeholders and AuthContext + API helper

Next actions to finalize:
- Wire frontend forms to API endpoints (register/login/forgot/reset)
- Implement input validation and better error UI on frontend
- Add unit/integration tests
- Harden security (rate-limiting, helmet, input validation)
