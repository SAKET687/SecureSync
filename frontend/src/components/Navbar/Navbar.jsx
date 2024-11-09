import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
	const { user, logout } = useAuth();

	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<h1>SecureSync</h1>
			</div>
			<div className="navbar-links">
				<Link to="/" className="navbar-link">
					Home
				</Link>
				{!user ? (
					<Link to="/login" className="navbar-link">
						Login
					</Link>
				) : (
					<Link to="/profile" className="navbar-link">
						Profile
					</Link>
				)}
			</div>
			{user && (
				<button onClick={logout} className="navbar-logout-btn">
					Logout
				</button>
			)}
		</nav>
	);
};

export default Navbar;
