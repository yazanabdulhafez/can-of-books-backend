"use strict";

const userModel = require("../models/User.model");

const BookController = (req, res) => {
  const { email } = req.query;
  userModel.find({ email: email }, (error, user) => {
    if (error) {
      res.send(error.message);
    }
    res.json(user[0].books);

  });
};
module.exports = BookController;