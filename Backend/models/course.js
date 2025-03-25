const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    language: { type: [String], required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalLectures: { type: Number, required: true },
    courseTime: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" }
});

module.exports = mongoose.model("Course", courseSchema);
