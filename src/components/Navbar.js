import React, { useContext } from "react";
import AuthContext from "../context/authContext";

const Navbar = () => {
	const { user, authReady, login, logout } = useContext(AuthContext);
	return (
		<nav className="nav">
			<div className="nav-header">
				<h2>Serverless TTD App</h2>
			</div>

			<div className="login">
				<div>
					{!user && (
						<button onClick={login} className="btn">
							Login/Signup
						</button>
					)}
					{authReady && user && <h4>{user.email}</h4>}
					{user && (
						<button onClick={logout} className="btn">
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
