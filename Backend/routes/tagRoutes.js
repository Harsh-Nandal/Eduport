const express = require('express');
const { addTags, getTags } = require('../controllers/tagController');
const router = express.Router();

router.post('/', addTags);
router.get('/', getTags);

module.exports = router;
