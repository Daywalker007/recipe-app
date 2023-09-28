const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport = require("passport")
const schemas = require('./models/schemas')
require('dotenv').config()

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            callbackURL:"/auth/google/callback",
            scope:['profile','email']
        },
        (accessToken, refreshToken, profile, done) => {
            // Passport callback function

            schemas.Users.findOne({"googleId":profile.id})
            .then(currentUser => {
                if(currentUser){
                    // User exists already
                    console.log('Current User is:', currentUser)

                    // Serialize user
                    done(null,currentUser)
                } else {
                    // Create new user

                    // Data to fill out User nodel
                    const userData = {
                        userName: profile.displayName,
                        googleId: profile.id
                    }
            
                    new schemas.Users(userData).save().then((newUser) => {
                        console.log('New user created:', newUser)

                        // Serialize user
                        done(null,currentUser)
                    })
                }                    
            })            
        }
    )
)

passport.serializeUser((user,done) => {
    // Pass info from user into cookie in browser
    console.log('Serializing user')
    // Pass MongoDB id into cookie
    done(null, user.id)
})

// Decodes data
passport.deserializeUser((id,done) => {
    // Get user from id in cookie

    console.log('Deserializing user')

    schemas.Users.findById(id).then((user) => {
        // Send user from id given to cookie
        done(null, user)
    })
})

module.exports = passport