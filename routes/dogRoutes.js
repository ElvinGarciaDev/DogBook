const express = require('express')
const dogController = require("../controllers/dogController")
const router = express.Router()

router.get("/", dogController.getAllDogs); // When the router hears this request go to this controller

// When someone click on the upload link. Show the upload page. Find the code in dogController
router.get("/upload", dogController.uploadPage)

//You can grab the query paramater with :id. :id is creating a paramter that will hold the query paramater. Route has to match the edit link in home.ejs
router.get("/edit/:id", dogController.updateDog)

router.get("/delete/:id", dogController. deleteDog) // same as edit