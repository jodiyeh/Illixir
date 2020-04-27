const Validator = require("validator");
const isEmpty = require("is-empty");
var addressValidator = require('address-validator');
var Address = addressValidator.Address;
var _ = require('underscore');

module.exports = function validateUserLogin(data) {
  let errors = {};
  let exact = {};
  let nomatch = {};

  addressValidator.validate(address, addressValidator.match.streetAddress, function(err, exact, inexact){
    console.log('input: ', address.toString())
    console.log('match: ', _.map(exact, function(a) {
      exact = a.toString();
      return a.toString();
    }));
    console.log('did you mean: ', _.map(inexact, function(a) {
      nomatch = a.toString();
      return a.toString();
    }));

    //access some props on the exact match
    var first = exact[0];
    console.log(first.streetNumber + ' '+ first.street);
  });

  if(isEmpty(match)) {
    errors.address = "did you mean: " + nomatch;
  }
  // Return validity
  if(isEmpty(errors)){
    return {errors, isValid: true};
  }
  return {errors, isValid: false};

};
