const Course = require("../models/course");
const Instructor = require("../models/instructor");
const Curriculum = require('../models/curriculum');

const createCourse = async (req, res) => {
    try {
        const { title, description, category, level, language, price, discount, totalLectures, courseTime, instructorId } = req.body;

        const course = new Course({
            title,
            description,
            category,
            level,
            language,
            price,
            discount,
            totalLectures,
            courseTime,
            instructor: instructorId
        });

        await course.save();
        await Instructor.findByIdAndUpdate(instructorId, { $push: { courses: course._id } });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addSection = async (req, res) => {
    try {
        const { courseId, title } = req.body;
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const newSection = new Curriculum({ title, course: courseId });
        await newSection.save();

        course.curriculum.push(newSection._id);
        await course.save();

        res.status(200).json({ message: 'Section added successfully', newSection });
    } catch (error) {
        res.status(500).json({ message: 'Error adding section', error });
    }
};

// ✅ Properly export all functions
module.exports = { createCourse, getCourses, addSection };
