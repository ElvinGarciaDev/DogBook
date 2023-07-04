
// Use express framework
const express = require('express')
const app = express()


// use port the port # in .env and if it's not avaliable use 8000
const PORT = process.env.PORT || 8000


//Use .env file in config folder
require('dotenv').config()


//middleware

//Body Parsing so we can look at the stuff coming in from the forms
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
