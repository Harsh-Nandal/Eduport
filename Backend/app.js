// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const jwt = require("jsonwebtoken")
const User = require("./models/user.js");
const authMiddleware = require("./middleware/authMiddleware.js");
const instructorRoutes = require("./routes/instructorRoutes");
const bodyParser = require("body-parser");
const courseRoutes = require("./routes/courses");
const session = require("express-session");
const userRoutes = require("./routes/users");





const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Frontend URL
    credentials: true, // ✅ Allow cookies, authentication headers
    methods: "GET,POST,PUT,DELETE,OPTIONS", // ✅ Explicitly allow these methods
    allowedHeaders: "Content-Type,Authorization", // ✅ Explicitly allow headers
  })
);
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // Set true if using HTTPS
      httpOnly: true,
      sameSite: "lax" // ✅ Important for CORS
    },
  })
);
// Required for handling preflight requests
app.options("*", cors());
app.use((req, res, next) => {
  console.log("🔥 Incoming request:", req.method, req.url);
  console.log("🛠️ Headers:", req.headers);
  next();
});
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Serve profile pictures
app.use(express.urlencoded({ extended: true }));



// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);

app.use("/api", instructorRoutes);

app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);



// 🟢 **API: Make User an Instructor**
app.post("/api/make-instructor", authMiddleware, async (req, res) => {
  try {
    const { email, phoneNo } = req.body;

    // Find the user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update user role
    user.role = "instructor";
    user.phoneNo = phoneNo; // Update only phoneNo
    await user.save();

    res.json({ message: "User is now an instructor!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






