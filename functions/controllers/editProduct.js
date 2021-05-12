const airtable = require("./model");

module.exports.editProduct = async (event, context) => {
	// postman =
	// 	{
	// 	"id":"recEBQkGkWe9tXcbe",
	//     "name": "dw1",
	//     "user": "DW",
	//     "status": true,
	// 	"desc": "descbbbbbbbbbbb",
	// 	"date_added": "8/9/20"
	// 	}

	if (!context.clientContext.user) {
		return {
			statusCode: 404,
			body: JSON.stringify({ err: "Please login" }),
		};
	}

	try {
		const {
			id,
			user,
			status,
			date_added,
			date_completed,
			name,
			desc,
		} = JSON.parse(event.body);

		const fields = {
			user: user,
			status: status,
			name: name,
			desc: desc,
			date_completed: date_completed,
			date_added: date_added,
		};
		const item = await airtable.update(id, { fields });
		// console.log(item);

		if (item.error) {
			return {
				statusCode: 400,
				body: JSON.stringify({ err: item.error.message }),
			};
		}

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
};
