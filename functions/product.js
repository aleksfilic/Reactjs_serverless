const getProducts = require("./controllers/getProducts");
const createProduct = require("./controllers/createProduct");
const deleteProduct = require("./controllers/deleteProduct");
const editProduct = require("./controllers/editProduct");

exports.handler = async (event, context, cb) => {
	if (event.httpMethod === "GET") {
		const { id } = event.queryStringParameters;
		// single
		if (id) {
			return await getProducts.getProduct(event, context);
		}
		// all
		return await getProducts.getProducts(event, context);
	} else if (event.httpMethod === "POST") {
		return await createProduct.createProduct(event, context);
	} else if (event.httpMethod === "PUT") {
		return await editProduct.editProduct(event, context);
	} else if (event.httpMethod === "DELETE") {
		return await deleteProduct.deleteProduct(event, context);
	}
};
