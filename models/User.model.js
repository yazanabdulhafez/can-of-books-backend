"use strict";

const mongoose = require("mongoose");
const bookSchema = require("./Book.model");

const userScheme = new mongoose.Schema({
  email: { type: String },
  books: [bookSchema],
});

const userModel = mongoose.model("user", userScheme);

const seedUserData = () => {
  const yazan = new userModel({
    email: "fso361435@gmail.com",
    books: [
      { name: "a smarter way to learn javascript", description: "programming", status: "New" },
      { name: "full stack react", description: "programming", status: "Used" },
      { name: "learning web design", description: "programming", status: "New" },
    ]
  });
  console.log(yazan);
  yazan.save();
};
// seedUserData();
module.exports = userModel;