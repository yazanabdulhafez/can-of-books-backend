const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String
});


module.exports = BookSchema;