const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require("express-session");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const authRoutes = require('./routes/authRoutes');
const instructorRoutes = require("./routes/instructorRoutes");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/users");

const authMiddleware = require("./middleware/authMiddleware");
const User = require("./models/user");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: process.env.NODE_ENV === "production", 
      httpOnly: true, 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    },
  })
);
app.use('/uploads', express.static("uploads")); // Serve media files

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);
app.use("/api", instructorRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);


// API: Make User an Instructor
app.post("/api/make-instructor", authMiddleware, async (req, res) => {
  try {
    const { email, phoneNo } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "instructor";
    user.phoneNo = phoneNo;
    await user.save();

    res.json({ message: "User is now an instructor!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
