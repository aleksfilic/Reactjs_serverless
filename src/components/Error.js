import React from "react";
import { Link } from "react-router-dom";
const Error = () => {
	return (
		<div style={{ margin: "20px" }}>
			<h1>Page not found</h1>
			<Link className="btn" to="/">
				Home
			</Link>
		</div>
	);
};

export default Error;
