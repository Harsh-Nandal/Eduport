const Course = require("../models/course");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const instructorId = req.user.id; // From auth middleware
    const { title, description, category, price, curriculum, faqs, tags, messageToReviewer } = req.body;

    const newCourse = new Course({
      instructor: instructorId,
      title,
      description,
      category,
      price,
      thumbnail: req.file ? req.file.path : "",
      curriculum: JSON.parse(curriculum),
      faqs: JSON.parse(faqs),
      tags: JSON.parse(tags),
      messageToReviewer,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get courses for logged-in instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
