const express = require("express");
const { fetchProfile, updateProfile } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/fetch-profile", authMiddleware, fetchProfile);
router.put("/profile-updation", authMiddleware, updateProfile);

module.exports = router;
