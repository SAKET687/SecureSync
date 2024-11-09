const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes")

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
	res.send("SecureSync is running its backend");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});
