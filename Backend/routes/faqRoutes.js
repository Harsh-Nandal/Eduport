const express = require('express');
const { addFAQ, getFAQs, deleteFAQ } = require('../controllers/faqController');
const router = express.Router();

router.post('/', addFAQ);
router.get('/', getFAQs);
router.delete('/:id', deleteFAQ);

module.exports = router;
