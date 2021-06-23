
const mongoose = require("mongoose");
const { mongoUrl, options } = require("./config");

function connect() {
  mongoose.connect(mongoUrl, options).then(() => console.log("Connect to DB"));
}

function disconnect() {
  mongoose.disconnect();
}

module.exports = { connect, disconnect };

const { dbUrl, options } = require("./config");
const mongoose = require("mongoose");

const connect = () =>
	mongoose.connect(dbUrl, options).then(() => console.log("Connect to DB"));

const disconnect = () => mongoose.disconnect();

module.exports = { connectD, disconnect };
