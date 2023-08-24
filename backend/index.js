const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/', router)

const dbOptions = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(process.env.DB_URI, dbOptions)
    .then(() => console.log('DB connected'))
    .catch((err) => console.error(err))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))