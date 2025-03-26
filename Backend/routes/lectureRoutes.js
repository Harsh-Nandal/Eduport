const express = require('express');
const { addLecture } = require('../controllers/lectureController');
const router = express.Router();

router.post('/add-lecture', addLecture);

module.exports = router;