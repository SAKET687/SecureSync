/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api.utils";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
	const { login } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post("/auth/login", formData);
			const { token } = response.data;
			login(token); navigate("/profile");
			toast.success("Login successful!");
			
		} catch (error) {
			console.log(error);
			toast.error(error.response?.data?.message || "Login failed");
		}
	};

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
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
				<button type="submit">Login</button>
			</form>
			<div className="auth-link">
				<p>
					Don't have an account? <Link to="/signup">Create one</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
