"use strict";

const userModel = require("../models/User.model");

const BookController = (req, res) => {
  const { email } = req.query;
  userModel.find({ email: email }, (error, userData) => {
    if (error) {
      res.send(error.message);
    }
    res.json(userData[0].books);

  });
};

const createBookController = (req, res) => {
  const { email, bookName, bookDescription, bookStatus } = req.body;

  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.send(error);
    } else {
      userData.books.push({ name: bookName, description: bookDescription, status: bookStatus });
      userData.save();
      res.json(userData);
    }
  });
};

const deleteBookController = (req, res) => {
  const bookId = req.params["id"];


  userModel.findByIdAndDelete({ _id: bookId }, (error, userData) => {
    console.log(bookId);
    if (error) {
      res.send(error.message);
    } else {
      res.send('book deleted')

    }
  });
};

module.exports = { BookController, createBookController, deleteBookController };