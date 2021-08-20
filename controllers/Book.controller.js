"use strict";

const userModel = require("../models/User.model");

//http: //localhost:8000/Books?email=fso361435@gmail.com

const BookController = (req, res) => {
  const { email } = req.query;
  userModel.find({ email: email }, (error, userData) => {
    if (error) {
      res.send('user not found');
    }
    res.json(userData[0].books);

  });
};

//http://localhost:8000/books


const createBookController = (req, res) => {
  const { email, bookName, bookDescription, bookStatus } = req.body;

  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.send(error.message);
    } else {
      userData.books.push({ name: bookName, description: bookDescription, status: bookStatus });
      userData.save();
      res.json(userData);
    }
  });
};

//http://localhost:8000/books/611ed79b374c4c0c384646ff?email=fso361435@gmail.com

const deleteBookController = (req, res) => {
  const bookId = req.params["id"];
  const { email } = req.query;
  // userModel.findByIdAndDelete(bookId, (error, userData) => {
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.send(error);
    } else {
      console.log(userData.books);
      userData.books = userData.books.filter((book) => book._id != bookId);
      userData.save();
      res.json(userData);
    }
  });
};


//http://localhost:8000/books/611d1d23fe874615350907d4
// {
//   "email": "fso361435@gmail.com",
//   "bookName": "fullhh stack react",
//   "bookDescription": "programmigng hacker",
//   "bookStatus": "Used once nfer "
// }
const updateBookController = (req, res) => {
  const bookIndex = req.params["id"];
  const { email, bookName, bookDescription, bookStatus } = req.body;

  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.send(error);
    } else {
      // console.log(userData.books);
      // const index = userData.books.findIndex(element => element._id == bookIndex);
      // console.log(index);

      userData.books.splice(bookIndex, 1, { name: bookName, description: bookDescription, status: bookStatus });
      userData.save();
      res.json(userData);
      console.log(userData);
    }
  });
};
module.exports = { BookController, createBookController, deleteBookController, updateBookController };