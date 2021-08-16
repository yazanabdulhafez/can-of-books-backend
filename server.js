'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const StartingController = require('./controllers/Starting.controler');
const BookController = require('./controllers/Book.controller')
const app = express();
app.use(cors());
const mongoose = require("mongoose");

const seedUserData = require("./models/User.model");
mongoose.connect("mongodb://localhost:8000/BestBooks", { useNewUrlParser: true, useUnifiedTopology: true });


const PORT = process.env.PORT;

const client = jwksClient({
  // this url comes from your app on the auth0 dashboard 
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

// this is a ready to use function
const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function(err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

app.get('/', StartingController);

app.get('/Books', BookController);

app.get('/test', (req, res) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      res.send('invalid token');
    }
    res.send(user)
  })
})

app.listen(PORT, () => console.log(`listening on Port ${PORT}`));