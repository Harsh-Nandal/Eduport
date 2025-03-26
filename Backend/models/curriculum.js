const mongoose = require("mongoose");


const CurriculumSchema = new mongoose.Schema({
    title: String,
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

module.exports = mongoose.model('Curriculum', CurriculumSchema);