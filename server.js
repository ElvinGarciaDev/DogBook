
// Use express framework
const express = require('express')
const app = express()
// Handle interaction with out database.
const mongoose = require('mongoose')

const connectDB = require("./config/database"); // Holds our Database connect

const methodOverride = require("method-override"); // So we don't have to use client side javascript when we use a form to send a delete or put. html forms orginally only send get and post request

// Routes
const dogRoutes = require("./routes/dogRoutes")
const userRoutes = require("./routes/userRoutes")

//Use forms for put / delete
app.use(methodOverride("_method"));

//Using EJS for views
app.set("view engine", "ejs")

const session = require("express-session"); // Enable us to stay logged in

//passport for auht/login
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

//Use .env file in config folder. This needs to be above connectDB() method in order for the method to get the DB string from .env
require('dotenv').config()

//Connect To Database
connectDB();

//Static Folder. All files in the public are to be served. This way we don't have to service every file. Ex: static files that don't change. Photos, css, htmk
app.use(express.static("public"));

// bring in the user model
const User = require("./models/userModel")

// Auth login middleware
// Setup Sessions - stored in MongoDB. Does not log you out if you leave the page
app.use(session({
  secret: 'dogs are awesome', 
  resave: false,
  saveUninitialized: false
}));

  // Turn passport on // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(User.authenticate()));

  // this is the tool that takes a user password and scrambles it when someone creates a password, then descrables it when the user is entering their password
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  //middleware for login. Passing current ingo to all routes
  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
    });
    

//middleware
//Body Parsing so we can look at the stuff coming in from the forms
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Setup Routes For Which The Server Is Listening
app.use("/", dogRoutes) // If any '/' route come in. Use the mainRoutes file
app.use("/", userRoutes)

// use port the port # in .env and if it's not avaliable use 8000
const PORT = process.env.PORT || 8000


// Setup server
app.listen( PORT, () => {
    console.log(`The server is running on port ${PORT} you better go catch it!`)
} )