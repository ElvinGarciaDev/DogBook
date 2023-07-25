const express = require('express')
const dogController = require("../controllers/userController"); // import the dogController
const userController = require('../controllers/userController');
const router = express.Router()

// SHow the login page
router.get("/login", userController.loginPage); // When the router hears this request go to this controller

router.post("/login", userController.loginUser) // When user enters password and username and want to login

router.get("/register", userController.registerPage) // Show the reegister page

router.post("/register", userController.resisterUser) // When the user signs up

router.get("/logout", userController.logoutUser) // When user logs out

module.exports = router