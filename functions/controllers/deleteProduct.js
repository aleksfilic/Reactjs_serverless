const airtable = require("./model");

module.exports.deleteProduct = async (event, context) => {
	// postman  =  localhost:8888/api/product?id=recNFCnhRz8aYNB79;
	const { id } = event.queryStringParameters;

	if (!context.clientContext.user) {
		return {
			statusCode: 404,
			body: JSON.stringify({ err: "Please login" }),
		};
	}

	if (id) {
		try {
			const item = await airtable.delete(id);
			// console.log(item)
			if (item.error) {
				return {
					statusCode: 400,
					body: JSON.stringify({ err: "No item found" }),
				};
			}

			return {
				statusCode: 200,
				body: JSON.stringify({ msg: "item deleted" }),
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
}; //delete
