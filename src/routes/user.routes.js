const { Router } = require('express')
const User = require('../db/models/user.model')
const router = Router()
const SALTROUND = 8;


router
  .route('/registration')
  .get((req, res) => {
    res.render('registration');
  })
  .post(async (req, res) => {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, SALTROUND);
    try {
      const newUser = await User.create({ name, email, password: hash });
      console.log('newUser =>', newUser);
      if (newUser) {
        req.session.username = newUser.name;
        req.session.userId = newUser._id;
      }
      res.redirect('/');
    } catch (error) {
      console.log(error);
      res.redirect('/users/registration');
    }
  });

module.exports = router
