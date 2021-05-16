import User from '../database/modeldb.js'
import bcr from 'bcryptjs'
import { validationResult as vld } from 'express-validator'
import jwt from 'jsonwebtoken'
import rd from './redisControll.js'

const generatorToken = email => {
  const payload = { email }
  return jwt.sign(payload, 'juda maxfiy', { expiresIn: '24h' })
}

class authControl {
  async regist(req, res) {
    try {
      const err = vld(req)
      if (!err.isEmpty()) return res.status(400).json({ message: err })
      const { email, password } = req.body
      const NOEMPTY = await User.modelUser.findOne({ email })

      if (NOEMPTY)
        return res.status(400).json({ message: 'this user have! ERROR' })

      const hashpass = bcr.hashSync(password, 5)
      const user = new User.modelUser({ email, password: hashpass })
      await user.save()
      //redis
      rd.creatMethod(email, hashpass)
      //end redis
      return res.json({ message: 'user created!' })
    } catch (e) {
      console.log('regist ERROR: >>', e)
      res.status(400).json({ message: 'Registration ERROR' })
    }
  }

  async FindUser(email, res) {
    // try {
    const user = await User.modelUser.findOne({ email })

    if (!user)
      return res.status(400).json({ message: 'No such email was found!' })

    return user
  }

  validPass(pass1, pass2, res) {
    const validPass = bcr.compareSync(pass1, pass2)

    if (!validPass) return res.status(400).json({ message: 'password ERROR' })

    const token = generatorToken(email)

    return res.json({ token })
  }
}

export default new authControl()
