const authCheck = (req, res, next) => {
    if(!req.user){
        // User not logged in
        console.log('User NOT logged in')
        res.send({error:'Error: Faild auth check'})
    } else {
        // Go to the next piece of middleware
        console.log('User IS logged in')
        next()
    }
}

module.exports.isAuthenticated = authCheck