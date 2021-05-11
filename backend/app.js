import express from 'express'
import bdp from 'body-parser'
import rout from './routers/router.js'
import { connectFun } from './database/connectdb.js'
const app = express()

app.use(bdp.json())
app.use(bdp.urlencoded({ extended: false }))
app.use(rout)

await connectFun()

const PORT = process.env.PORT || 3000
app.listen(PORT, e => console.log('http://localhost:' + PORT))
