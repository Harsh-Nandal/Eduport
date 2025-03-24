const express = require("express");
const { createCourse, getInstructorCourses } = require("../controllers/courseController");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// Create a new course
router.post("/create", auth, upload.single("thumbnail"), createCourse);

// Get courses for logged-in instructor
router.get("/my-courses", auth, getInstructorCourses);

module.exports = router;
