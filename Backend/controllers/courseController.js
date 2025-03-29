const Course = require("../models/course");
const Instructor = require("../models/instructor");


const createCourse = async (req, res) => {
    try {
        const { title, description, category, level, language, price, discount, totalLectures, courseTime, image,
            videoUrl, videoFile, instructorId, faqs, tags, lectures, reviewMessages } = req.body;

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
            image,
            videoUrl,
            videoFile,
            instructor: instructorId,
            faqs,
            tags,
            lectures,
            reviewMessages
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

const addLecture = async (req, res) => {
    try {
        const { courseId, title, videoUrl, videoFile, topics } = req.body;
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const newLecture = { title, videoUrl, videoFile, topics };
        course.lectures.push(newLecture);
        await course.save();

        res.status(200).json({ message: 'Lecture added successfully', newLecture });
    } catch (error) {
        res.status(500).json({ message: 'Error adding lecture', error });
    }
};

const addReview = async (req, res) => {
    try {
        const { courseId, user, message, rating } = req.body;
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const newReview = { user, message, rating };
        course.reviewMessages.push(newReview);
        await course.save();

        res.status(200).json({ message: 'Review added successfully', newReview });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
};

module.exports = { createCourse, getCourses, addSection, addLecture, addReview };
