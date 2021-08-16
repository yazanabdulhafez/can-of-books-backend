"use strict";

const mongoose = require("mongoose");
const BookSchema = require('./Book.model');

const UserScheme = new mongoose.Schema({
  email: { type: String },
  books: [BookSchema]
});

const UserModel = mongoose.model("user", UserScheme);

const seedUserData = () => {
  const newUser = new UserModel({
    email: "fso361435@gmail.com",
    books: [
      { name: "a smarter way to learn javascript", description: "programming", status: "New" },
      { name: "full stack react", description: "programming", status: "Used" },
      { name: "learning web design", description: "programming", status: "New" },
    ],
  });
  console.log(newUser);
  newUser.save();
};
seedUserData();
module.exports = UserModel;