const { Router } = require("express");
const router = Router();
const Post = require("../db/models/posts.model");

router
	.route("/")
	.get(async (req, res) => {
		const posts = await Post.find();
		res.render("posts", { posts });
	})
	.post(async (req, res) => {})
	.put(async (req, res) => {})
	.patch(async (req, res) => {})
	.delete(async (req, res) => {});

module.exports = router;
