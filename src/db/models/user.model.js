const { model } = require("mongoose");

const User = model("User", {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

module.exports = User;

