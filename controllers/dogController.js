// Bring in the dogModel so we can talk to the data base.
const dogModel = require("../models/DogModel");

//Bring in cloudinary
const cloudinary = require("../middleware/cloudinary");


// We are exporting an object and all these are async methods. We need to export because routes folder calls them
module.exports = {
  // get all the dogs in the database
  getAllDogs: async (req, res) => {
    try {
      const dogPosts = await dogModel.find();

      // Send the obj we got from the database to ejs to render
      res.render("home.ejs", { dogs: dogPosts });
    } catch (error) {
      console.log(error);
    }
  },

  // When a get request is sent to /upload. Show the upload page
  uploadPage: async (req, res) => {
    try {
      res.render("upload.ejs");
    } catch (error) {
      console.log(error);
    }
  },

  // When a user submitts the form  to upload a new dog.

  createDog: async (req, res) => {
    try {
    //   console.log(req.body);
    //   console.log(req.file.path);

      //Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Use the dog schema to create a new document in the database
      await dogModel.create({
        name: req.body.name,
        age: Number(req.body.age),
        favoriteFood: req.body.favoriteFood,
        funFact: req.body.funFact,

        // Need this information to track image. 
        image: result.secure_url,
        cloudinaryId: result.public_id

      })
      res.redirect("/")


    } catch (error) {
      console.log(error);
    }
  },
};
