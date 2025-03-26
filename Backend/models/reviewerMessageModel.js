const mongoose = require('mongoose');

const reviewerMessageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    agreement: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ReviewerMessage', reviewerMessageSchema);
