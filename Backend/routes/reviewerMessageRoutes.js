const express = require('express');
const { addMessage } = require('../controllers/reviewerMessageController');
const router = express.Router();

router.post('/', addMessage);

module.exports = router;
