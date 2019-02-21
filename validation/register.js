const Validator = require('validator');
const isEmpty = require('./is-empty');

// data is the value passed in to inputs
// eg info
module.exports = function validateRegisterInput(data) {
  // initialize empty Obj to pass errors into
  let errors = {};


  // check if feilds are empty // make sure feilds are empty
  // then goes to validate
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, {
      min: 4,
      max: 30
    })) {
    errors.name = 'Name must be between 4 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (data.email) {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (data.password) {
    if (!Validator.isLength(data.password, {
        min: 6,
        max: 30
      })) {
      errors.password = 'Password must be at least 6 characters';
    }
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    // return errors
    errors,
    // pass errors to validate
    isValid: isEmpty(errors)
  };
};

// errors.name, errors.email
// is simple passing our errs into ou empty errors obj
// ! = not equal