const express = require("express");
const cors = require('cors')
const dotenv = require("dotenv")
const colors = require("colors");
const { connectDB } = require("./config/db");
const mainRouter = require('./routes/index.js')
const app = express()
const PORT = 5000

dotenv.config()

connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/v1', mainRouter)



app.listen(PORT, console.log(
    `Server running in node port ${PORT}`.yellow.bold
))

