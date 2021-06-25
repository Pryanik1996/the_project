const mongoose = require("mongoose");
const { mongoUrl, options } = require("./config");

function connect() {
  mongoose.connect(mongoUrl, options).then(() => console.log("Connect to DB"));
}

function disconnect() {
  mongoose.disconnect();
}

module.exports = { connect, disconnect };
