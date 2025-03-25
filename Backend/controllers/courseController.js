const Course = require("../models/course");
const Instructor = require("../models/instructor");

exports.createCourse = async (req, res) => {
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

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
