import { Router } from 'express'
import rd from '../controllers/redisControll.js'
import { check } from 'express-validator'
import authController from '../controllers/authController.js'

const rout = Router()

rout.post('/login', rd.FindMethod)
rout.post(
  '/regist',
  [
    check('email', 'please email! ERROR').notEmpty().isEmail(),
    check('password', 'password length > 4').isLength({ min: 4 }),
  ],
  authController.regist
)

export default rout
