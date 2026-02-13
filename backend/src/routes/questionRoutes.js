const express = require('express');
const router = express.Router();
const qc = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.get('/', qc.list);
router.post('/add', protect, requireRole('admin'), qc.add);
router.put('/:id', protect, requireRole('admin'), qc.update);
router.delete('/:id', protect, requireRole('admin'), qc.remove);
router.get('/:id', qc.get);

module.exports = router;
