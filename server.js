import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import { connect, syncDatabase } from './database/db.js'
import checkToken from './authentication/auth.js'
import {
    userRouter,
    todoRouter
} from './routes/index.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(checkToken)
app.use(express.json()) 
app.use('/todo-api-app/user', userRouter)
app.use('/todo-api-app/todo', todoRouter)

app.get('/todo-api-app', (req, res) => {
    res.send("Hi, I'm Nguyen Nhat Phong")
})

app.listen(PORT, async () => {
    await connect()
    await syncDatabase()
    console.log(`App listening on port ${PORT}`)
})