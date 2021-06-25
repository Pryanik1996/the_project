const { model } = require("mongoose");

const Share = model("Share", {
	name: { type: String, unique: true },
	price: { type: Number },
	quantity: { type: Number },
});

module.exports = Share;
