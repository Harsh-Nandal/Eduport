const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  curriculum: [
    {
      lectureTitle: String,
      topics: [
        {
          title: String,
          videoUrl: String,
          description: String,
          isPremium: Boolean,
        },
      ],
    },
  ],
  faqs: [
    {
      question: String,
      answer: String,
    },
  ],
  tags: [String],
  messageToReviewer: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);
