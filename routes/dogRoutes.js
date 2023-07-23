const express = require('express')
const dogController = require("../controllers/dogController") // import the dogController
const router = express.Router()
const upload = require("../middleware/multer") // bring in multer

router.get("/", dogController.getAllDogs); // When the router hears this request go to this controller

// When someone click on the upload link. Show the upload page. Find the code in dogController
router.get("/upload", dogController.uploadPage)

// When the user submitts a dog to update
router.post("/upload", upload.single("upload"), dogController.createDog)


//You can grab the query paramater with :id. :id is creating a paramter that will hold the query paramater. Route has to match the edit link in home.ejs
// This will bring you to the edit page. There is another request the edits the post
router.get("/edit/:id", dogController.editPage)

// When the user is at the edit post, and they update any fields on that post
router.put("/edit/:id", dogController.editPost)

// router.delete("/delete/:id", dogController. deleteDog) // same as edit

module.exports = router