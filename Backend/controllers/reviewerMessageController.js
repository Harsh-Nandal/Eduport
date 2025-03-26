const ReviewerMessage = require('../models/reviewerMessageModel');

// Add a message
exports.addMessage = async (req, res) => {
    try {
        const { message, agreement } = req.body;
        const newMessage = new ReviewerMessage({ message, agreement });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
