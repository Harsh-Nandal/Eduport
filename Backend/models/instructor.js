const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  bio: { type: String },
  education: { type: [String], default: [] },
  experience: { type: [String], default: [] },
  profilePicture: { type: String, default: "/uploads/default-avatar.jpg" },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] // Array of courses
});

module.exports = mongoose.model("Instructor", instructorSchema);
