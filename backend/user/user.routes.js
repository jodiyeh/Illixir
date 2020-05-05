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
  console.log("POST: /api/user/register - Attempt to Register.");

  // Form validation
  const {errors, isValid} = validateUserRegister(req.body);
  console.log("Errors: " + errors);
  console.log("Valid: " + isValid);

  // Check validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email}).then(user => {
    // Check if email exists
    if(user) {
      console.log("User already exists.")
      return res.status(400).json({email: "Email already exists"});
    } else {
      newUser = new User({
        username: req.body.username,
        email: req.body.email,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
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

// Login user
router.post("/login", (req, res) => {
  console.log("POST: /api/user/login - Attempt to Login.");

  // Form validation
  const {errors, isValid} = validateUserLogin(req.body);
  console.log("Errors: " + errors);
  console.log("Valid: " + isValid);

  // Check validation
  if(!isValid){
    return res.status(400).json(errors);
  }

  // Find user by email
  User.findOne({email: req.body.email}).then(user => {
    if(!user){
      console.log("User not found.")
      return res.status(404).json("Email not found");
    }
    // Check password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched Create JWT Payload ?
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          streetAddress: user.streetAddress,
          city: user.city,
          state: user.state,
          zipcode: user.zipcode,
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

router.route('/:id').get((req,res) => { // mongo has :id variable that can be used to access the id of an object
  console.log("GET: /api/user/:id - Attempt to get user " + req.params.id + " data.");

  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req,res) => {
  console.log("POST: /api/user/update/:id - Attempt to update user " + req.params.id + " data.");

  User.findById(req.params.id)
    .then(user => {
      console.log("User found.");
      user.streetAddress = req.body.streetAddress;
      user.city = req.body.city;
      user.state = req.body.state;
      user.zipcode = req.body.zipcode;
      user.save()
        .then(() => res.json('User address updated.'))
        .catch(err => res.status(400).json('Error ' + err));
    })
    .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;
