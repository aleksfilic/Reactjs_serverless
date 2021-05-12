const airtable = require("./model");

module.exports.createProduct = async (event, context) => {
	// postman
	// {
	//     "name": "dw1",
	//     "user": "DW",
	//     "status": true,
	// 	"desc": "descbbbbbbbbbbb",
	// 	"date_added": "8/9/20"
	// }
	// console.log(context.clientContext.user);
	if (!context.clientContext.user) {
		return {
			statusCode: 404,
			body: JSON.stringify({ err: "Please login" }),
		};
	}

	const { user, status, date_added, name, desc } = JSON.parse(event.body);

	const fields = {
		user: user,
		status: status,
		name: name,
		desc: desc,
		date_added: date_added,
	};

	try {
		const item = await airtable.create({ fields: fields });
		// console.log(item);

		if (item.error) {
			console.log("E", item.error);
			return {
				statusCode: 400,
				body: JSON.stringify({ err: item.error.message }),
			};
		}

		return {
			statusCode: 200,
			body: JSON.stringify({ msg: item.id }),
		};
	} catch (err) {
		console.log("EEE", err.message);
		return {
			statusCode: 500,
			body: JSON.stringify({ err: err.message }),
		};
	}
};
