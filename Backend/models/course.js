const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  videoFile: String,
  topics: [{ title: String, content: String }]
});

const ReviewSchema = new mongoose.Schema({
  user: String,
  message: String,
  rating: Number
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  price: { type: Number, required: true },
  totalLectures: { type: Number, required: true },
  courseTime: { type: String, required: true },
  image: String,
  videoUrl: String,
  videoFile: String,
  faqs: [{ question: String, answer: String }],
  tags: [String],
  lectures: [LectureSchema],
  reviewMessages: [ReviewSchema]
});

module.exports = mongoose.model('Course', CourseSchema);