const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
const { getUsers } = require('./handlers/jwtHandler');

require("dotenv").config();
const PORT = process.env.PORT;

const { BookController, createBookController, deleteBookController, updateBookController } = require("./controllers/Book.controller");
const startingController = require("./controllers/Starting.controller");
const seedUserData = require("./models/User.model");

const mongoUrl = 'mongodb+srv://Yazan:hghv]k12345@cluster0.pzuvo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to DB !!'));
seedUserData();

app.get("/", startingController);
app.get("/books", BookController);
app.post("/books", createBookController);
app.delete("/books/:id", deleteBookController);
app.put("/books/:id", updateBookController);

app.get('/test', getUsers);
app.listen(PORT, () => console.log(`listening on port ${PORT}`));