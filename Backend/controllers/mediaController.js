const Course = require('../models/course');

// Upload course image
const uploadImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

        const imageUrl = req.file.path;
        res.status(200).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error });
    }
};

// Upload course video
const uploadVideo = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No video uploaded' });

        const videoFilePath = req.file.path;
        res.status(200).json({ videoFilePath });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading video', error });
    }
};

// Save media URLs to a course
const saveCourseMedia = async (req, res) => {
    try {
        const { courseId, imageUrl, videoUrl, videoFile } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (imageUrl) course.image = imageUrl;
        if (videoUrl) course.videoUrl = videoUrl;
        if (videoFile) course.videoFile = videoFile;

        await course.save();
        res.status(200).json({ message: 'Course media updated successfully', course });
    } catch (error) {
        res.status(500).json({ message: 'Error updating course media', error });
    }
};

module.exports = { uploadImage, uploadVideo, saveCourseMedia };
