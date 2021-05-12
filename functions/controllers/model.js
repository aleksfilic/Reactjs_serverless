require("dotenv").config();
const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
	.base(process.env.AIRTABLE_API_BASE)
	.table("products");

module.exports = airtable;
