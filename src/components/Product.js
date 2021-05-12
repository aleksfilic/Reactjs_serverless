import React, { useState, useContext } from "react";
import moment from "moment";
import AuthContext from "../context/authContext";

const Product = ({ data, setData, item }) => {
	const { user } = useContext(AuthContext);
	const [edit, setEdit] = useState(false);
	const [name, setName] = useState(item.name);
	const [desc, setDesc] = useState(item.desc);

	const { id, date_added } = item;

	const handleCompleted = async (e, id) => {
		const item = data.find((item) => item.id === id);

		let amendItem = "";
		if (!item.status) {
			amendItem = {
				...item,
				status: true,
				date_completed: moment().format("MM/DD/YYYY"),
			};
		} else {
			amendItem = {
				...item,
				status: !item.status,
				date_completed: null,
			};
		}
		// console.log(item);

		if (item) {
			try {
				const res = await fetch("/api/product", {
					method: "PUT",
					body: JSON.stringify(amendItem),
					headers: { Authorization: "Bearer " + user.token.access_token },
				});
				// eslint-disable-next-line
				const resData = await res.json();
				// console.log("RS", resData);

				const newList = data.map((item) => {
					if (item.id === amendItem.id) {
						return amendItem;
					}
					return item;
				});

				setData(newList);
			} catch (err) {
				console.log(err.message);
			}
		}
	};

	const handleEdit = async (e, item) => {
		setEdit(false);

		if (!item.name || !item.desc) {
			return;
		}

		let amendItem = {
			date_completed: item.date_completed,
			desc: desc,
			id: item.id,
			name: name,
			status: item.status,
			user: user.email,
			date_added: item.date_added,
		};

		try {
			const res = await fetch("/api/product", {
				method: "PUT",
				body: JSON.stringify(amendItem),
				headers: { Authorization: "Bearer " + user.token.access_token },
			});
			// eslint-disable-next-line
			const resData = await res.json();
			// console.log("RS", resData);

			const newList = data.map((item) => {
				if (item.id === amendItem.id) {
					return amendItem;
				}
				return item;
			});

			setData(newList);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleCancel = async (e, edit) => {
		console.log(edit);
		setDesc(edit.desc);
		setName(edit.name);
		setEdit(false);
	};

	const handleDelete = async (e, id) => {
		// console.log(id); //

		try {
			const res = await fetch("/api/product?id=" + id, {
				method: "DELETE",
				headers: { Authorization: "Bearer " + user.token.access_token },
			});
			// eslint-disable-next-line
			const resData = await res.json();
			// console.log(resData);

			const newdata = data?.filter((item) => item.id !== id);

			setData(newdata);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className={item.status ? "article completed" : "article"} key={id}>
			<div className="container">
				<div className="form-group">
					<label>Title:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
							setEdit(true);
						}}
						required
						className="form-control"
						// value={name}
					/>
				</div>

				<div className="form-group">
					<label>Description:</label>
					<textarea
						type="text"
						value={desc}
						onChange={(e) => {
							setDesc(e.target.value);
							setEdit(true);
						}}
						required
						className="form-control"
						cols="30"
						rows="5"
					/>
				</div>
				<div className="form-group">
					<p>Created on {date_added}</p>
				</div>

				<div className="form-group form-check ">
					<label>
						<input
							type="checkbox"
							value={item.status}
							onChange={(e) => handleCompleted(e, id)}
							checked={item.status}
						/>
						<span> Completed</span>
					</label>
				</div>

				{item.date_completed && (
					<div className="form-group">
						<p>{item.date_completed}</p>
					</div>
				)}

				<div className="flex-container">
					<div className="flex-item-left">
						<button
							className="btn btn-delete"
							onClick={(e) => handleDelete(e, id)}
						>
							Delete
						</button>
					</div>

					<div className="flex-item-right">
						{edit && (
							<button
								className="btn btn-edit btn-edit-position"
								onClick={(e) => handleEdit(e, item)}
							>
								Save
							</button>
						)}
						{edit && (
							<button
								className="btn btn-cancel btn-cancel-position"
								onClick={(e) => handleCancel(e, item)}
							>
								Cancel
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
