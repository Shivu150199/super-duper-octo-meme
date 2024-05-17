import connection from './config/db.js'
import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/route.user.js'

import cors from 'cors'
import jobRouter from './routes/job.route.js'
import path from 'path'

const __dirname = path.resolve()
dotenv.config()
const app = express()

const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/auth/v1', userRouter)
app.use('/api/job/v1', jobRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})
app.listen(port, async () => {
  await connection
  console.log(`app is listening on port ${port}`)
})
