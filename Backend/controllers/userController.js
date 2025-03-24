const User = require("../models/user");

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Update user name (Save to DB)
exports.updateUserName = async (req, res) => {
    try {
        const { name } = req.body; // Get name from request body
        if (!name) return res.status(400).json({ message: "Name is required" });

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = name; // Update name
        await user.save(); // Save to database

        res.json({ message: "User name updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
