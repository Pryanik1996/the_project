const { Router } = require("express");
const User = require("../db/models/user.model");
const Share = require("../db/models/share.model");
const bcrypt = require("bcrypt");
const router = Router();
const SALTROUND = 8;

router
	.route("/login")
	.get((req, res) => {
		res.render("login");
	})
	.post(async (req, res) => {
		const { email, password } = req.body;

		try {
			const findUser = await User.findOne({ email });
			if (findUser && (await bcrypt.compare(password, findUser.password))) {
				req.session.userName = findUser.name;
				req.session.userId = findUser._id;
        console.log(req.session.userId, 'SESSION')
				req.session.userAdmin = findUser.admin;
				res.redirect("/");
			}
		} catch (error) {
			console.log("err login ", error);
			res.redirect("/users/login");
		}
	});

router
	.route("/registration")
	.get((req, res) => {
		res.render("registration");
	})
	.post(async (req, res) => {
		const { name, email, password } = req.body;
		console.log(req.body);
		const hash = await bcrypt.hash(password, SALTROUND);
		try {
			await Share.findOneAndUpdate({ name: "Base" }, { $inc: { quantity: -1 } }, { new: true });
			await User.updateMany({ $inc: { money: +10 } });
			const newUser = await User.create({
				name,
				email,
				password: hash,
			});
			if (newUser) {
				req.session.userName = newUser.name;
				req.session.userId = newUser._id;
				req.session.userAdmin = newUser.admin;
			}
			res.redirect("/");
		} catch (error) {
			console.log("err", error);
			res.redirect("/users/registration");
		}
	});

router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) return res.redirect("/");
		res.clearCookie(req.app.get("cookieName"));
		return res.redirect("/");
	});
});

module.exports = router;
