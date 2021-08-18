"use strict";

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
});

module.exports = bookSchema;