const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Validation
const validateUserRegister = require("./Validation/user.register");
const validateUserLogin = require("./Validation/user.login");
const validateUserAddress = require("./Validation/user.address");

// User model
let User = require('./user.model');

// Register user
router.post("/register", (req, res) => {
  console.log("register attempt");

  // Form validation
  const {errors, isValid} = validateUserRegister(req.body);
  console.log(errors);
  console.log(isValid);
  console.log(JSON.stringify(req.body));

  // Check validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email}).then(user => {
    // Check if email exists
    console.log("1");
    if(user) {
      return res.status(400).json({email: "Email already exists"});
    } else {
      newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      console.log("2");

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          console.log("4");
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
      console.log("3");
    }
  });
});

// Login user
router.post("/login", (req, res) => {
  // Form validation
  const {errors, isValid} = validateUserLogin(req.body);
  console.log("login attempt");
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
          username: user.username
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

router.route('/address/update/:id').post((req,res) => {
  // Form validation
  const {errors, isValid} = validateUserAddress(req.body);
  console.log("address change attempt");
  // Check validation
  if(!isValid){
    return res.status(400).json(errors);
  }
  User.findById(req.params.id)
    .then(user => {
      user.address = req.body.address;
      user.save()
        .then(() => res.json('User address updated!'))
        .catch(err => res.status(400).json('Error ' + err));
    })
    .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;
