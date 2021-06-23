const { model } = require("mongoose");

const Post = model("Post", {
	title: { type: String, required: true },
	body: { type: String, required: true },
	likes: { type: Number, default: 0 },
	dislikes: { type: Number, default: 0 },
});

module.exports = Post;
