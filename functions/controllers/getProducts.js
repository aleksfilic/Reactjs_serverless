const airtable = require("./model");

module.exports.getProducts = async (event, context) => {
	if (!context.clientContext.user) {
		return {
			statusCode: 404,
			body: JSON.stringify({ err: "Please login" }),
		};
	}

	try {
		const { records } = await airtable.list();
		// console.log(context.clientContext.user.email);

		const email = context.clientContext.user.email;
		console.log(email);

		const products = records.map((product) => {
			const { id } = product;
			const { name, user, desc, status, date_added, date_completed } =
				product.fields;

			return {
				id,
				user,
				name,
				desc,
				status,
				date_added,
				date_completed,
			};
		});

		const products2 = products.filter((item) => item.user === email);
		// console.log("P2", products2);

		// console.log(products);

		return {
			statusCode: 200,
			body: JSON.stringify(products2),
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify({ err: "Server Error" }),
		};
	}
};

module.exports.getProduct = async (event, context) => {
	const { id } = event.queryStringParameters;

	// console.log(id);
	if (id) {
		try {
			const product = await airtable.retrieve(id);
			console.log(product);
			const item = {
				id: product.id,
				user: product.fields.user,
				desc: product.fields.desc,
				status: product.fields.status,
				date_added: product.fields.date_added,
				date_completed: product.fields.date_completed,
			};

			return {
				statusCode: 200,
				body: JSON.stringify(item),
			};
		} catch (err) {
			return {
				statusCode: 500,
				body: JSON.stringify({ err: "Server Error" }),
			};
		}
	}
	return {
		statusCode: 500,
		body: JSON.stringify({ err: "Please provide id" }),
	};
};
