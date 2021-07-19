const Validator = require("validator");
const isEmpty = require("./is-empty");

//Aqui seteamos el validador para el registro de usuarios

module.exports = function validateLoginInput(data) {
  let errors = {};

  //Primero verificamos que los elementos existan
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //Realizamos las validaciones para cada uno de los elementos

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
