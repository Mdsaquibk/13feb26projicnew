const express = require('express');
const router = express.Router();
const sa = require('../controllers/superAdminController');

router.get('/login', sa.showLogin);
router.post('/login', sa.handleLogin);
router.get('/dashboard', sa.dashboard);
router.get('/pending-admins', sa.pendingAdmins);
router.post('/approve/:id', sa.approve);
router.post('/reject/:id', sa.reject);

module.exports = router;
