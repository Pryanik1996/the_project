const { Router } = require("express");
const User = require("../db/models/user.model");
const router = Router();

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const { email, password } = req.body;
    try {
      const findUser = await User.findOne({ email });
      if (findUser && (await bcrypt.compare(password, findUser.password))) {
        req.session.username = findUser.name;
        req.session.userId = findUser._id;
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
    res.redirect("/users/login");
  });

module.exports = router;
