import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../utils/api.utils";
import "./SignUp.css";
import { Link } from "react-router-dom";

const Signup = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post("/auth/registration", formData);
			const { token } = response.data;
			localStorage.setItem("token", token);
			toast.success("Signup successful!");
			navigate("/profile");
		} catch (error) {
			toast.error(error.response?.data?.message || "Signup failed");
		}
	};

	return (
		<div className="signup-container">
			<h2>Signup</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="Full Name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<button type="submit">Signup</button>
			</form>
			<div className="login-link">
				<p>
					Already have an account? <Link to="/login">Login</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
