const { Router } = require("express");
const router = Router();
const Post = require("../db/models/posts.model");

router
	.route("/")
	.get((req, res) => {
		if (res.locals.userAdmin) {
			res.render("votes");
		}
	})
	.post(async (req, res) => {
		try {
			if (res.locals.userAdmin) {
				await Post.create(req.body);
			}
			res.redirect("/votes");
		} catch (error) {
			console.log(err);
		}
	});

module.exports = router;
