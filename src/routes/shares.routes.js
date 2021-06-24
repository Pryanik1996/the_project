const { Router } = require("express");
const router = Router();
const User = require("../db/models/user.model");
const Share = require("../db/models/share.model");

router
	.route("/")
	.get(async (req, res) => {
		try {
			if (res.locals.userAdmin) {
				const shares = await Share.find();
				res.render("shares", { shares });
			}
		} catch (err) {
			console.log(err);
		}
	})
	.post(async (req, res) => {
		if (res.locals.userAdmin) {
			console.log(req.body);
			const newShare = await Share.create(req.body);
			console.log(newShare);
			res.redirect("/shares");
		}
	});

module.exports = router;
