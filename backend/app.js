import express from 'express'
import bdp from 'body-parser'
import rout from './routers/router.js'
import { connectFun } from './database/connectdb.js'
import passport from 'passport'
import session from 'express-session'
import client from './redis/redis.js'
import conRedis from 'connect-redis'
const RedisStore = conRedis(session)
const app = express()

app.use(bdp.json())
app.use(bdp.urlencoded({ extended: false }))
app.use(
  session({
    store: new RedisStore({ client: client }),
    saveUninitialized: false,
    secret: 'juda maxfiy',
    resave: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(rout)
app.use((req, res, next) => {
  if (!req.session) return res.status(401).json({ session: 'oh no!' })

  res.status(404).json({ page: 'Not Fount!' })
  next()
})
await connectFun()

const PORT = process.env.PORT || 3000
app.listen(PORT, e => console.log('http://localhost:' + PORT))
