const passport = require("passport")
const User = require("../models/userModel")

module.exports = {

    loginPage: async (req, res) => {
        console.log("Hello")
        res.render("login.ejs", {user: req.user})
    },

    registerPage: async (req, res) => {
        res.render("register.ejs", {user: req.user})
    },

    
    loginUser: passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false
    }),

    resisterUser: async (req, res) => {
        try {

            // Take the req.body that should hold the usernane and password and assign them to these variables
            const {username, password} = req.body

            const user = new User({username})
            await User.register(user,password)

            passport.authenticate('local')(req, res, function() {
                res.redirect('/')
            })

            
        } catch (error) {
            console.log(error)
            res.redirect("/register")
        }
    },

    logoutUser: (req, res) => {
        req.logout(function(err) {
            if(err) {return next(err)}
            res.redirect('/')
        })
    }

}