import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import userRouter from './src/user/router'

dotenv.config()
const PORT = process.env.PORT || 8000
const DB_URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ubfh33z.mongodb.net/?retryWrites=true&w=majority`

const app = express()

app.use(express.json())
app.use('/api', userRouter)

const start = async () => {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`),
    )
  } catch (e) {
    console.error(e)
  }
}

start()
