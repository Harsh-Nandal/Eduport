const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    console.log("🔍 Checking Authorization Header:", req.header("Authorization"));

    // Extract the token
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      console.warn("⚠️ No token received in backend.");
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not defined. Check your .env file.");
      return res.status(500).json({ error: "Internal server error" });
    }

    console.log("✅ Token received in backend:", token);

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        console.error("⏳ Token has expired.");
        return res.status(401).json({ error: "Token expired. Please log in again." });
      } else {
        console.error("⚠️ Invalid token:", error.message);
        return res.status(401).json({ error: "Invalid or expired token" });
      }
    }

    console.log("🔍 Decoded Token Payload:", decoded);

    if (!decoded.id) {
      return res.status(401).json({ error: "Invalid token structure" });
    }

    // Fetch user from database
    req.user = await User.findById(decoded.id).select("name email avatar");

    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("✅ User authenticated:", req.user);
    next();
  } catch (error) {
    console.error("⚠️ Error in auth middleware:", error.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
