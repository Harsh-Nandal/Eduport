const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
    title: String,
    videoLink: String,
    description: String,
    isPremium: Boolean,
    curriculum: { type: mongoose.Schema.Types.ObjectId, ref: 'Curriculum' }
});

module.exports = mongoose.model('Lecture', LectureSchema);