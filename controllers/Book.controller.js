const UserModel = require("../models/User.model");

const BookController = (req, res) => {
  const email = req.query.email;
  UserModel.findOne({ email: email }, (error, user) => {
    if (error) {
      res.send(error);
    } else {
      if (user === null) {
        user = new UserModel({ email, books: [] });
        user.save();
      }
      res.json(user);
    }
  });
};


module.exports = BookController;