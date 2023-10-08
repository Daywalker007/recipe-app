const express = require('express')
const cors = require('cors')
const router = require('./routes/recipe')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const passportSetup = require('./passport')
const authRoutes = require('./routes/auth')
const isAuthenticated = require('./middleware/isAuthenticated')
require('dotenv').config()

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true
}))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(session({
    secret:process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie:{
        secure:false
    }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use('/', router)
app.use('/auth', authRoutes)

const dbOptions = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(process.env.DB_URI, dbOptions)
    .then(() => console.log('DB connected'))
    .catch((err) => console.error(err))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))