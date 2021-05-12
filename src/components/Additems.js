import React, { useState, useContext } from "react";
import moment from "moment";

import AuthContext from "../context/authContext";

const Additems = ({ data, setData }) => {
	const { user } = useContext(AuthContext);

	const [name, setName] = useState("");
	const [desc, setDesc] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		console.log(user.token.access_token);

		if (!name || !desc) {
			return;
		}

		const newRecord = {
			name,
			desc,
			status: false,
			user: user.email,
			date_added: moment().format("MM/DD/YYYY"),
		};

		try {
			const res = await fetch("/api/product", {
				method: "POST",
				body: JSON.stringify(newRecord),
				headers: {
					// "Content-Type": "application/json",
					Authorization: "Bearer " + user.token.access_token,
				},
			});

			const resData = await res.json();

			console.log("RS", resData);
			setData([...data, { id: resData.msg, ...newRecord }]);
			setMessage(resData.msg ? "Item added" : "Error. Please try again");
			//clear

			if (message) {
				setTimeout(function () {
					setMessage("");
				}, 2000);
			}

			setName("");
			setDesc("");
		} catch (err) {
			console.log("DW", err.message);
		}
	}; //handle submit

	return (
		<div className="section section-center ">
			<h4 className="add-item-title text-capitalize text-center">Add Task</h4>
			{message && (
				<div className="alert alert-success text-center">{message}</div>
			)}
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="form-group">
					<label>Title:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className="form-control"
						placeholder="Add title"
					/>
				</div>

				<div className="form-group">
					<label>Description:</label>
					<textarea
						type="text"
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
						required
						className="form-control"
						placeholder="Add description ...."
						cols="30"
						rows="5"
					/>
				</div>

				<button className="btn" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Additems;
