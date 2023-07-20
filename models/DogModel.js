const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      favoriteFood: {
        type: String,
        required: true,
      },
      funFact: {
        type: String,
        required: true,
      },

      image: {
        type: String,  // we dont want to store media in our databse. Cloaudanery stores the image on their server and give us a url
        require: true,
      },
      cloudinaryId: {
        type: String,
        require: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      }

})

module.exports = mongoose.model("Dog", dogSchema)