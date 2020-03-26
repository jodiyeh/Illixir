const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Validation
const validateUserRegister = require("./Validation/user.register");
const validateUserLogin = require("./Validation/user.login");

// User model
let User = require('./user.model');

// Login user
router.post("/register", (req, res) => {
  // Form validation
  const {errors, isValid} = validateUserRegister(req.body);

  // Check validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email}).then(user => {
    // Check if email exists
    if(user) {
      return res.status(400).json({email: "Email already exists"});
    } else {
      newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// Register user
router.post("/login", (req, res) => {
  // Form validation
  const {errors, isValid} = validateUserLogin(req.body);

  // Check validation
  if(!isValid){
    return res.status(400).json(errors);
  }

  // Find user by email
  User.findOne({email: req.body.email}).then(user => {
    if(!user){
      return res.status(404).json("Email not found");
    }
    // Check password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched Create JWT Payload ?
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
})

module.exports = router;
