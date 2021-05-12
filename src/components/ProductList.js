import React, { useContext } from "react";
import Product from "./Product";
import AuthContext from "../context/authContext";

const ProductList = ({ data, setData }) => {
	// console.log("data -Product list", data);
	const { authReady } = useContext(AuthContext);

	if (!authReady) {
		return <h2>loading..</h2>;
	}
	return (
		<>
			{authReady && (
				<section className="section section-center">
					<hr />
					{data.length === 0 && (
						<div className="title-header">
							<p className="text-center ">No Items</p>
						</div>
					)}
					{data.find((item) => item.status !== true) && (
						<>
							<div>
								<h3 className="text-center">Tasks to complete</h3>
							</div>
							<article>
								{data
									.filter((item) => item.status !== true)
									.map((item) => {
										return (
											<Product
												key={item.id}
												item={item}
												data={data}
												setData={setData}
											/>
										);
									})}
							</article>
						</>
					)}

					{data.find((item) => item.status === true) && (
						<>
							<hr />
							<div>
								<h3 className="text-center">Completed</h3>
							</div>
							<article>
								{data
									.filter((item) => item.status === true)
									.map((item) => {
										return (
											<Product
												key={item.id}
												item={item}
												data={data}
												setData={setData}
											/>
										);
									})}
							</article>
						</>
					)}
				</section>
			)}
		</>
	);
};

export default ProductList;
