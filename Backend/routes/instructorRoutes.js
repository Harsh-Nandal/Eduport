const express = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");
const User = require("../models/user");
const Instructor = require("../models/Instructor");
const authMiddleware = require("../middleware/authMiddleware");

dotenv.config();
const router = express.Router();

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// ✅ Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Udemy_Files-Videos",
    format: async (req, file) => file.mimetype.split("/")[1],
    public_id: (req, file) => file.originalname.split(".")[0],
    resource_type: "image",
  },
});

// ✅ Initialize Multer with Cloudinary Storage
const upload = multer({ storage });

// ✅ Create Instructor Profile (Protected Route)
router.post(
  "/create-instructorProfile",
  authMiddleware,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const { fullName, email, phone, location, bio, education, experience } = req.body;

      // ✅ Validate required fields
      if (!fullName || !email || !phone || !location) {
        return res.status(400).json({ message: "All required fields must be filled" });
      }

      // ✅ Ensure education & experience are parsed arrays
      let parsedEducation, parsedExperience;
      try {
        parsedEducation = Array.isArray(education) ? education : JSON.parse(education || "[]");
        parsedExperience = Array.isArray(experience) ? experience : JSON.parse(experience || "[]");
      } catch (error) {
        return res.status(400).json({ message: "Invalid education/experience format" });
      }

      // ✅ Check if instructor already exists
      const existingInstructor = await Instructor.findOne({ user: req.user._id });
      if (existingInstructor) {
        return res.status(400).json({ message: "Instructor profile already exists" });
      }

      // ✅ Ensure file upload exists before accessing path
      let profilePicture = "/uploads/default-avatar.jpg"; // Default profile picture
      if (req.file) {
        profilePicture = req.file.path; // Cloudinary URL
      }

      // ✅ Save instructor data
      const instructor = new Instructor({
        user: req.user._id,
        fullName,
        email,
        phone,
        location,
        bio,
        education: parsedEducation,
        experience: parsedExperience,
        profilePicture,
      });

      await instructor.save();

      // ✅ Update the user document with instructor reference
      await User.findByIdAndUpdate(req.user._id, { instructor: instructor._id });

      res.status(201).json({ message: "Instructor profile created successfully", instructor });
    } catch (error) {
      console.error("❌ Error creating instructor:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// ✅ Get Instructor Profile by User ID
router.get("/instructor", authMiddleware, async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ user: req.user._id });

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.json(instructor);
  } catch (error) {
    console.error("❌ Error fetching instructor:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
