
// Use express framework
const express = require('express')
const app = express()

 // Handle interaction with out database.
const mongoose = require('mongoose')

const connectDB = require("./config/database"); // Holds our Database connect

//Use .env file in config folder. This needs to be above connectDB() method in order for the method to get the DB string from .env
require('dotenv').config()

//Connect To Database
connectDB();


// use port the port # in .env and if it's not avaliable use 8000
const PORT = process.env.PORT || 8000



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

app.get('/', (req, res) => {
    res.write('<h1>Hello, World!</h1>')
    res.end()
})