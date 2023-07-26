// Bring in the dogModel so we can talk to the data base.
const dogModel = require("../models/DogModel");

//Bring in cloudinary
const cloudinary = require("../middleware/cloudinary");

// We are exporting an object and all these are async methods. We need to export because routes folder calls them
module.exports = {
  // get all the dogs in the database
  getAllDogs: async (req, res) => {
    try {
      const dogPosts = await dogModel.find().populate('owner'); // gets all the dog data and also gets the information of the owner of each document

      // Send the obj we got from the database to ejs to render
      res.render("home.ejs", { dogs: dogPosts, user: req.user });
    } catch (error) {
      console.log(error);
    }
  },

  // When a get request is sent to /upload. Show the upload page
  uploadPage: async (req, res) => {
    try {
      res.render("upload.ejs", {user: req.user});
    } catch (error) {
      console.log(error);
    }
  },

  // When a user submitts the form  to upload a new dog.

  createDog: async (req, res) => {
    try {
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
        cloudinaryId: result.public_id,

        // Tie the post to a user
        owner: req.user._id // Whatever user is logged in, it will grab it and attach it to the post
      });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },

  // When a user click to edit a post from the home page. Find that post in the database and serve it
  editPage: async (req, res) => {
    try {
      // Find the post that the user is looking for by grabbing the ID from the url
      const post = await dogModel.findById(req.params.id); // .params.id getting the query paramater from the url

      res.render("edit.ejs", { dog: post, user: req.user }); //Once a post that machtes this id is found. Send it to the edit.ejs. Also send the comment array
    } catch (error) {
      console.log(error);
    }
  },

  // When the user is at the edit post, and they update any fields on that post
  editPost: async (req, res) => {
    try {

      // In order for someone to edit a post we need to make sure they are the owner of the post. We could've just hidden the edit and delete buttons in the front end for post that 
      // Were not made by the logged in user, but people could still type in the address manually and change them
      // It's a good idea to match the id of the logged in person with the owner of the post. 
      let dog = await dogModel.findById(req.params.id)
      if(dog.owner.equals(req.user._id)) {
              // Go in the database. find a post that matches the id passed in the url params and edit it
      await dogModel.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/");

      }
    } catch (error) {
      console.log(error);
    }
  },

  // When a user wants to delete a post
  deleteDog: async (req, res) => {
    try {

      // In order for someone to edit a post we need to make sure they are the owner of the post. We could've just hidden the edit and delete buttons in the front end for post that 
      // Were not made by the logged in user, but people could still type in the address manually and change them
      // It's a good idea to match the id of the logged in person with the owner of the post. 
      let dog = await dogModel.findById(req.params.id)
      if(dog.owner.equals(req.user._id)) {

        // Find the post by id
      let post = await dogModel.findById({ _id: req.params.id });

      // Delete image from cloudinary.
      let cloud = await cloudinary;

      cloud.uploader.destroy(post.cloudinaryId); // This deletes it from cloudinary becuase we no longer need it

      // Delete post from db
      await dogModel.findByIdAndRemove({ _id: req.params.id })
      res.redirect("/")

      }
    
    } catch (error) {
        console.log(error)
    }
  },
};
