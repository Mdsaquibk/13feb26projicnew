const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.get('/users', protect, requireRole('admin'), admin.getUsers);
router.get('/questions', protect, requireRole('admin'), admin.getQuestions);

module.exports = router;
