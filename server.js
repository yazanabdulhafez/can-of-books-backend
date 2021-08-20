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


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
seedUserData();

app.get("/", startingController);
app.get("/books", BookController);
app.post("/books", createBookController);
app.delete("/books/:id", deleteBookController);
app.put("/books/:id", updateBookController);

app.get('/test', getUsers);
app.listen(PORT, () => console.log(`listening on port ${PORT}`));