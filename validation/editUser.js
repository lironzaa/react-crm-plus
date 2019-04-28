const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEditUserInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = 'First name must contain at least 2 characters';
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name field is required';
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = 'Last name must contain at least 2 characters';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name field is required';
  }

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'Username must contain at least 2 characters';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.matches(data.phone, /^(?:0(?!(5|7))(?:2|3|4|8|9))(?:-?\d){7}$|^(0(?=5|7)(?:-?\d){9})$/)) {
    errors.phone = 'Phone is invalid';
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}