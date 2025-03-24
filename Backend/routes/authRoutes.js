// routes/authRoutes.js
const express = require('express');
require("dotenv").config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Backend Generated Token:", token); // Debugging

    res.status(201).json({
      message: "Signup successful",
      token,
      userId: newUser._id,
    });
    console.log("✅ Backend Sending Token:", token);
console.log("✅ Backend Sending UserID:", newUser._id);

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});




// LOGIN Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "mysupersecretcode",
      { expiresIn: "1h" }
    );

    console.log("✅ Generated Token:", token); // Debugging log

    res.json({ token });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


router.get('/user/profile', authMiddleware, async (req, res) => {
  try {
    // ✅ Find the user by ID and populate instructor directly
    const user = await User.findById(req.user.id)
      .select("name email avatar instructor")
      .populate("instructor", "profilePicture fullName"); // ✅ Fetch only necessary instructor fields

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Log the fetched user to debug
    console.log("✅ Fetched User:", user);

    // ✅ Ensure the profile picture URL is fully qualified
    const baseURL = process.env.BASE_URL || "http://localhost:8080";
    const profilePicture = user.avatar 
      ? `${baseURL}${user.avatar}` 
      : user.instructor?.profilePicture 
        ? `${baseURL}${user.instructor.profilePicture}`
        : "/default-avatar.jpg"; // Default avatar fallback

    // ✅ Send properly formatted response
    res.json({
      name: user.instructor?.fullName || user.name || "Guest",
      email: user.email || "guest@example.com",
      profilePicture, // ✅ Fixed key to match frontend
    });

  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/logout", authMiddleware, (req, res) => {
  try {
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ error: "Server error during logout" });
  }
});

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // ✅ Generate a new token
    const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

module.exports = router;