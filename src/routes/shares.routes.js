const { Router } = require("express");
const router = Router();
const User = require("../db/models/user.model");

router
	.route("/")
	.get(async (req, res) => {
		try {
			res.render("shares");
		} catch (err) {
			console.log(err);
		}
	})
	.post(async (req, res) => {});

module.exports = router;
