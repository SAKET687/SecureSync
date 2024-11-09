const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res
				.status(401)
				.json({ message: "Please log in to access this resource." });
		}

		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).json({
					message:
						"Your session has expired or is invalid. Please log in again.",
				});
			}
			req.userId = decoded.id;
			next();
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				"An error occurred while verifying your session. Please try again later.",
			error: error.message,
		});
	}
};

module.exports = authMiddleware;
