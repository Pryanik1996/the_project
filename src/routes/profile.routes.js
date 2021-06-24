const { Router } = require("express");
const router = Router();
const User = require("../db/models/user.model");

router
	.route("/")
	.get(async (req, res) => {
		try {
			const user = await User.findById(res.locals.userId);
			const users = await User.find();

			const allShares = users.reduce((acc, el) => acc + el.countShare, 0);
			const percentShares = Math.round((user.countShare * 100) / allShares);
			res.render("profile", { user, percentShares });
		} catch (err) {
			console.log(err);
		}
	})
	.post(async (req, res) => {});

module.exports = router;
