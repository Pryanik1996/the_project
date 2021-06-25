const { Router } = require("express");
const router = Router();

const Share = require("../db/models/share.model");
const { findByIdAndUpdate, findOneAndUpdate } = require("../db/models/user.model");
const User = require("../db/models/user.model");

router.route("/").get(async (req, res) => {
	try {
		const user = await User.findById(res.locals.userId);
		const users = await User.find();
		const allSaresInStock = await Share.findOne({ name: "Base" });

		const allShares = users.reduce((acc, el) => acc + el.countShare, 0);

		const percentShares = Math.round((user.countShare * 100) / allShares);

		res.render("profile", { user, percentShares, allSaresInStock });
	} catch (err) {
		console.log(err);
	}
});
router
	.route("/share")
	.post(async (req, res) => {
		try {
			let user = {};
			let share = {};
			if (req.body.transaction === "buy") {
				share = await Share.findOneAndUpdate(
					{ name: "Base" },
					{ $inc: { quantity: -Number(req.body.count) } },
					{ new: true },
				);
				user = await User.findByIdAndUpdate(
					req.body._id,
					{
						$inc: {
							money: -(Number(share.price) * Number(req.body.count)),
							countShare: +Number(req.body.count),
						},
					},
					{ new: true },
				);
			}
			// ---------------------------------------------------
			if (req.body.transaction === "sell") {
				share = await Share.findOneAndUpdate(
					{ name: "Base" },
					{ $inc: { quantity: +Number(req.body.count) } },
					{ new: true },
				);
				user = await User.findByIdAndUpdate(
					req.body._id,
					{
						$inc: {
							money: +(Number(share.price) * Number(req.body.count)),
							countShare: -Number(req.body.count),
						},
					},
					{ new: true },
				);
			}

			const users = await User.find();
			const allShares = users.reduce((acc, el) => acc + el.countShare, 0);
			const percentShares = Math.round((user.countShare * 100) / allShares);
			res.json({ user, share, percentShares });
		} catch (err) {
			console.log("catch ==> ", err);
			res.sendStatus(500);
		}
	})
	.patch(async (req, res) => {});

module.exports = router;
