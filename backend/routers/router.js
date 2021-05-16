import { Router } from 'express'
import rd from '../controllers/redisControll.js'
import { check } from 'express-validator'
import authController from '../controllers/authController.js'
import passport from 'passport'
import '../controllers/passport-google.js'
const rout = Router()

rout.post('/api/auth/login', rd.FindMethod)
rout.post(
  '/api/auth/regist',
  [
    check('email', 'please email! ERROR').notEmpty().isEmail(),
    check('password', 'password (min:4)').isLength({ min: 4 }),
  ],
  authController.regist
)
// passport js ===================================>
rout.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

rout.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/salom',
    failureRedirect: '/error',
  })
)
rout.get(
  '/salom',
  (req, res, next) => {
    req.user ? next() : res.status(401).json({ mess: 'yuq oka!' })
  },
  (req, res) => {
    res.json({ message: 'welcome', xabar: req.user })
  }
)
rout.get('/error', (req, res) => {
  res.status(400).json({ error: 'error athenticate google login!' })
})
// end passport js ===============================>

export default rout
