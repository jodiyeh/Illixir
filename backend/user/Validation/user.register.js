const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserRegister(data) {
  let errors = {};
  var specialCharacters = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;


  // Check empty data
  if(isEmpty(data.username)) {
    data.username = "";
  }

  if(isEmpty(data.email)) {
    data.email = "";
  }
  if(isEmpty(data.password)) {
    data.password = "";
  }
  if(isEmpty(data.confirm)) {
    data.confirm = "";
  }

  // Validate className
  if (Validator.isEmpty(data.username)) {
    errors.username = "Name field is required";
  }

  // Validate address
  if (Validator.isEmpty(data.streetAddress)) {
    errors.streetAddress = "Address field is required";
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = "State field is required";
  }
  if (Validator.isEmpty(data.zipcode)) {
    errors.zipcode = "Zipcode field is required";
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

  if (Validator.isEmpty(data.confirm)) {
    errors.confirm = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    if(isEmpty(errors.password)) {
      errors.password = "Password must be at least 6 characters";
    } else {
      errors.password += "\nPassword must be at least 6 characters";
    }
  }

  // if(!specialCharacters.test(data.password)) {
  //   if(isEmpty(errors.password)) {
  //     errors.password = "Password must include a special character";
  //   } else {
  //     errors.password += "\nPassword must include a special character";
  //   }
  // }
  //
  // if (!Validator.isUppercase(data.password)) {
  //   if(isEmpty(errors.password)) {
  //     errors.password = "Password include an uppercase letter";
  //   } else {
  //     errors.password += "\nPassword include an uppercase letter";
  //   }
  // }

  if (!Validator.equals(data.password, data.confirm)) {
    errors.confirm = "Passwords must match";
  }


  // Return validity
  if(isEmpty(errors)) {
    return {errors, isValid: true};
  }
  return {errors, isValid: false};

};
