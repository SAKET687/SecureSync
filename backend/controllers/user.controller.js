const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const fetchProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({
            message: "User profile fetched successfully.",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user profile.",
            error: error.message,
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        console.log("Profile update process started.");

        console.log("Received update data:", req.body);

        const { name, email, password, phone, address, currentPassword } = req.body;

        console.log({ name, email, phone, address, password, currentPassword });

        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            console.log("User not found.");
            return res.status(404).json({ message: "User not found." });
        }
        console.log("User found:", user._id);

        if (password) {
            console.log("Password update requested.");
            if (!currentPassword) {
                console.log("Current password not provided.");
                return res.status(400).json({
                    message: "Current password is required to update password.",
                });
            }

            const isMatch = await user.matchPassword(currentPassword);
            if (!isMatch) {
                console.log("Current password is incorrect.");
                return res.status(400).json({ message: "Current password is incorrect." });
            }
            console.log("Current password is correct.");
            user.password = await bcrypt.hash(password, 10);
            console.log("Password hashed successfully.");
        }

        if (name) {
            console.log("Updating name:", name);
            user.name = name;
        }
        if (email) {
            console.log("Updating email:", email);
            user.email = email;
        }
        if (phone) {
            console.log("Updating phone:", phone);
            user.phone = phone;
        }
        if (address) {
            console.log("Updating address:", address);
            user.address = address;
        }

        console.log("Saving updated user profile...");
        const updatedUser = await user.save();
        console.log("Profile updated successfully for user:", updatedUser._id);

        res.status(200).json({
            message: "User profile updated successfully.",
            updatedUser,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({
            message: "Error updating user profile.",
            error: error.message,
        });
    }
};


module.exports = { fetchProfile, updateProfile };
