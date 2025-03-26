const express = require('express');
const { uploadImage, uploadVideo, saveCourseMedia } = require('../controllers/mediaController');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/upload-image', upload.single('image'), uploadImage);
router.post('/upload-video', upload.single('video'), uploadVideo);
router.post('/save-media', saveCourseMedia);

module.exports = router;
