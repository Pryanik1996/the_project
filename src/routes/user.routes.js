const { Router } = require('express')
const User = require('../db/models/user.model')
const bcrypt = require('bcrypt');
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
        req.session.userName = newUser.name;
        req.session.userId = newUser._id;
      }
      res.redirect('/');
    } catch (error) {
      console.log(error);
      res.redirect('/users/registration');
    }
  });

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) return res.redirect('/')
    res.clearCookie(req.app.get('cookieName'))
    return res.redirect('/')
  })
})


module.exports = router
