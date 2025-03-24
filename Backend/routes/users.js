const express = require("express");
const router = express.Router();
const { getUserById, updateUserName } = require("../controllers/userController");

// Route to get user by ID
router.get("/:id", getUserById);

// ✅ Route to update user name
router.put("/:id", updateUserName);

module.exports = router;
