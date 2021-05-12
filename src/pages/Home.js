import React, { useEffect, useState, useContext } from "react";
import Additems from "../components/Additems";
import Loading from "../components/Loading";
import ProductList from "../components/ProductList";

import AuthContext from "../context/authContext";

const Home = () => {
	const { user, authReady } = useContext(AuthContext);

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			const res = await fetch(
				"/api/product",
				user && {
					headers: {
						Authorization: "Bearer " + user.token.access_token,
					},
				}
			);
			const resData = await res.json();
			setData(resData);
			setLoading(false);
		} catch (err) {
			console.log(err.message);
			setError(err.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (authReady) {
			fetchData();
		}
		// eslint-disable-next-line
	}, [authReady]);

	useEffect(() => {
		if (!user) {
			setData([]);
		}
		// eslint-disable-next-line
	}, [authReady]);

	if (loading) {
		<Loading />;
	}

	return (
		<>
			{!user && (
				<header className="section section-center">
					<div className="intro">
						<h5>Please login to view your content</h5>

						<ul>
							<li>* React</li>
							<li>* Serverless functions</li>
							<li>* Netlify Identity - authentication management</li>
							<li>* AirTable Database</li>
						</ul>
					</div>
				</header>
			)}

			{user && (
				<main>
					{error && <div>{error}</div>}
					<>
						<Additems data={data} setData={setData} />
						<ProductList data={data} setData={setData} />
					</>
				</main>
			)}
		</>
	);
};

export default Home;
