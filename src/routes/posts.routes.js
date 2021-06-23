const { Router } = require("express");
const router = Router();

router
	.route("/")
	.get(async (req, res) => {
		res.render("posts");
	})
	.post(async (req, res) => {})
	.put(async (req, res) => {})
	.patch(async (req, res) => {})
	.delete(async (req, res) => {});

module.exports = router;
