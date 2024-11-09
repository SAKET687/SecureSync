const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/registration", registerUser);
router.post("/login", loginUser);

module.exports = router;
