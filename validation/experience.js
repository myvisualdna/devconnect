const Validator = require("validator");
const isEmpty = require("./is-empty");

//Aqui seteamos el validador para el registro de usuarios

module.exports = function validateExperienceInput(data) {
  let errors = {};

  //Primero verificamos que los elementos existan
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  //Realizamos las validaciones para cada uno de los elementos
  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
