const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
	try {
		const { name, email,  password } =
			req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res
				.status(409)
				.json({ message: "User with this email already exists." });
		}

		const user = new User({
			name,
			email,
			password,
		});
		await user.save();
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.status(201).json({
			message: "User registered successfully.",
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error registering user.",
			error: error.message,
		});
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user || !(await user.matchPassword(password))) {
			return res
				.status(400)
				.json({ message: "Invalid email or password." });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.status(200).json({ message: "Login successful.", token });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error logging in.",
			error: error.message,
		});
	}
};

module.exports = { registerUser, loginUser };
