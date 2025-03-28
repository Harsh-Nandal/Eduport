const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true } // Connecting FAQ to Course
}, { timestamps: true });

module.exports = mongoose.model('FAQ', faqSchema);
