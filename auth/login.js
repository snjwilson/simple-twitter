const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLogin(input) {
  const errors = {};
  input.email = !isEmpty(input.email) ? input.email : "";
  input.password = !isEmpty(input.password) ? input.password : "";

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

  // return the errors
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
