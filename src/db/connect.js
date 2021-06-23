const { dbUrl, options } = require("./config");
const mongoose = require("mongoose");

const connect = () =>
	mongoose.connect(dbUrl, options).then(() => console.log("Connect to DB"));

const disconnect = () => mongoose.disconnect();

module.exports = { connectD, disconnect };
