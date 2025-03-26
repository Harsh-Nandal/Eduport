const Tag = require('../models/tagModel');

// Add tags
exports.addTags = async (req, res) => {
    try {
        const { tags } = req.body;
        const tagDoc = new Tag({ tags });
        await tagDoc.save();
        res.status(201).json(tagDoc);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// Get all tags
exports.getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
