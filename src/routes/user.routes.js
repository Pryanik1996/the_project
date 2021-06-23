const { Router } = require('express')
const User = require('../db/models/user.model')
const router = Router()


router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) return res.redirect('/')
    res.clearCookie(req.app.get('cookieName'))
    return res.redirect('/')
  })
})


module.exports = router
