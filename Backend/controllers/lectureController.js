const Curriculum = require('../models/curriculum');
const Lecture = require('../models/lecture');

const addLecture = async (req, res) => {
    try {
        const { curriculumId, title, videoLink, description, isPremium } = req.body;
        const curriculum = await Curriculum.findById(curriculumId);
        if (!curriculum) return res.status(404).json({ message: 'Curriculum section not found' });

        const newLecture = new Lecture({ title, videoLink, description, isPremium, curriculum: curriculumId });
        await newLecture.save();

        curriculum.lectures.push(newLecture._id);
        await curriculum.save();

        res.status(200).json({ message: 'Lecture added successfully', newLecture });
    } catch (error) {
        res.status(500).json({ message: 'Error adding lecture', error });
    }
};

module.exports = { addLecture };
