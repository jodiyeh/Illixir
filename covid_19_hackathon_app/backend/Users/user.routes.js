const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Validation
const validateUserRegister = require("./Validation/user.register");
const validateUserLogin = require("./Validation/user.login");

let User = require('./user.model');

router.route('/:id').get((req,res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/create').post((req,res) => {
  const username = req.body.username;
  const newUser = new User({
    username,
  });
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req,res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error ' + err));
    })
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/delete/:id').delete((req,res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted!"))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
