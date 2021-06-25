const { Router } = require("express");
const router = Router();
const Post = require("../db/models/posts.model");

const adminAccess = (req, res, next) => {
	if (res.locals.userAdmin) {
		next();
	} else {
		res.redirect("/");
	}
};

router
	.route("/")
	.get(adminAccess, (req, res) => {
		res.render("votes");
	})
	.post(adminAccess, async (req, res) => {
		try {
			await Post.create(req.body);
			res.redirect("/votes");
		} catch (error) {
			console.log(err);
		}
	});

module.exports = router;
