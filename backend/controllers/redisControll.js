import client from '../redis/redis.js'
import ath from './authController.js'

class RedisControll {
  FindMethod(req, res) {
    try {
      const { email, password } = req.body

      client.KEYS(email, async (err, repl) => {
        if (err) console.log(err)

        if (!repl.length) {
          await ath.FindUser(email, res)
        } else {
          client.get(repl[0], (e, d) => {
            if (e) console.log(e)

            ath.validPass(password, d, res)
          })
        }
      })
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: `eny error ${e}` })
    }
  }

  creatMethod(key, val) {
    client.set(key, val)
  }
}
export default new RedisControll()
