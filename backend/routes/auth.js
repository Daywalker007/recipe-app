const router = require('express').Router()
const passport = require('passport')
const URL = require('url')
const { isAuthenticated } = require('../middleware/isAuthenticated')
require('dotenv').config()

router.get('/', isAuthenticated, (req,res) => {
    console.log('Login success: ', req.session)
    res.json(req.session.user)
})

router.get('/login/success', (req, res) => {
    console.log('Session on /login/success: ', req.session)
    if(req.session.user){
        res.send({
            error:false,
            message:'Successfully Logged In',
            user:req.session.user,
        })
    } else {
        res.status(403).json({error:true, message:'Not Authorized'})
    }
})

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        error:true,
        message:'Login failed'
    })
})

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureMessage: 'Cannot login to Google, please try again later'
    }),
    (req, res) => {
        // Calls callback function in passport.js file first before running this

        // User is successfully logged in
        console.log('You reached the callback URI with user:', req.user.id)

        // Attach user object to session var
        req.session.user = req.user
        req.session.authorized = true

        console.log('Session after setting user: ', req.session.id)

        res.redirect(`${process.env.CLIENT_URL}/login/success/`)
    }
)

// Login with Google using Passport
router.get('/google', passport.authenticate('google',{
    scope:['profile', 'email']
}))

router.get('/logout', (req,res) => {
    req.logout()
    res.redirect(process.env.CLIENT_URL)
})

module.exports = router