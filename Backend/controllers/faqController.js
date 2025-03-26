const FAQ = require('../models/faqModel');

// Add a new FAQ
exports.addFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const faq = new FAQ({ question, answer });
        await faq.save();
        res.status(201).json(faq);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// Get all FAQs
exports.getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// Delete an FAQ
exports.deleteFAQ = async (req, res) => {
    try {
        await FAQ.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
