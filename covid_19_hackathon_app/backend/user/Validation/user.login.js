const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserLogin(data) {
  let errors = {};

  // Check empty data
  if(isEmpty(data.email)) {
    data.email = "";
  }
  if(isEmpty(data.password)) {
    data.password = "";
  }

  // Validate email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Validate password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Return validity
  if(isEmpty(errors)){
    return {errors, isValid: true};
  }
  return {errors, isValid: false};

};
