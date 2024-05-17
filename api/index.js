import connection from './config/db.js'
import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/route.user.js'

import cors from 'cors'
import jobRouter from './routes/job.route.js'
dotenv.config()
const app = express()

const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/auth/v1', userRouter)
app.use('/api/job/v1', jobRouter)
app.listen(port, async () => {
  await connection
  console.log(`app is listening on port ${port}`)
})
