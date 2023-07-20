// Bring in the dogModel so we can talk to the data base. 
const dogModel = require("../models/DogModel")

// We are exporting an object and all these are async methods. We need to export because routes folder calls them
module.exports = {


    // get all the dogs in the database
    getAllDogs: async (req, res) => {

        try {
            const dogPosts = await dogModel.find()

            // Send the obj we got from the database to ejs to render
            res.render("home.ejs", {dogs: dogPosts})
            
        } catch (error) {
            console.log(error)
        }

    },

    // When a get request is sent to /upload. Show the upload page
    uploadPage: async (req, res) => {

        try {
            res.render("upload.ejs")
            
        } catch (error) {
            console.log(error)
        }

    }
}
