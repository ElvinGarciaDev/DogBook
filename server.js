
// Use express framework
const express = require('express')
const app = express()

 // Handle interaction with out database.
const mongoose = require('mongoose')


// use port the port # in .env and if it's not avaliable use 8000
const PORT = process.env.PORT || 8000


//Use .env file in config folder
require('dotenv').config()


//Using EJS for views
app.set("view engine", "ejs")

//Static Folder. All files in the public are to be served. This way we don't have to service every file. Ex: static files that don't change. Photos, css, htmk
app.use(express.static("public"));


//middleware

//Body Parsing so we can look at the stuff coming in from the forms
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Setup server
app.listen( PORT, () => {
    console.log(`The server is running on port ${PORT} you better go catch it!`)
} )