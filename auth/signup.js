const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSignUp(input) {
  const errors = {};
  input.firstName = !isEmpty(input.firstName) ? input.firstName : "";
  input.lastName = !isEmpty(input.lastName) ? input.lastName : "";
  input.email = !isEmpty(input.email) ? input.email : "";
  input.password = !isEmpty(input.password) ? input.password : "";
  input.confirmPassword = !isEmpty(input.confirmPassword)
    ? input.confirmPassword
    : "";

  // validate first name
  if (validator.isEmpty(input.firstName)) {
    errors.firstName = "First Name field required";
  }

  // validate last name
  if (validator.isEmpty(input.lastName)) {
    errors.lastName = "Last Name field required";
  }

  // validate email
  if (validator.isEmpty(input.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(input.email)) {
    errors.email = "Email is invalid";
  }

  // validate passwords
  if (validator.isEmpty(input.password)) {
    errors.password = "Password field is required";
  }
  if (validator.isEmpty(input.confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required";
  }
  if (!validator.isLength(input.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!validator.equals(input.password, input.confirmPassword)) {
    errors.password2 = "Passwords must match";
  }

  // return the errors
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
