const express = require('express');
const router = express.Router();
const cc = require('../controllers/contactController');

router.post('/submit', cc.submit);
router.get('/all', cc.getAll);

module.exports = router;
