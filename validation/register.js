const Validator = require("validator");
const isEmpty = require("./is-empty");

//Aqui seteamos el validador para el registro de usuarios

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //Primero verificamos que los elementos existan
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordTwo = !isEmpty(data.passwordTwo) ? data.passwordTwo : "";

  //Realizamos las validaciones para cada uno de los elementos
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.passwordTwo)) {
    errors.passwordTwo = "Confirm Password is required";
  }

  if (!Validator.equals(data.password, data.passwordTwo)) {
    errors.passwordTwo = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
