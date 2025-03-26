const express = require("express");
const { createCourse, getCourses } = require("../controllers/courseController");
const { addLecture } = require('../controllers/lectureController');

const router = express.Router();

router.post("/", createCourse);
router.get("/", getCourses);
router.post('/add-lecture', addLecture);


module.exports = router;
