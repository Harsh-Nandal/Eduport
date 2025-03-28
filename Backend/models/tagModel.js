const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    tags: { type: [String], required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] // Connecting Tags to multiple Courses
}, { timestamps: true });

module.exports = mongoose.model('Tag', tagSchema);
