const Validator = require("validator");
const isEmpty = require("./is-empty");

//Aqui seteamos el validador para el registro de usuarios

module.exports = function validatePostInput(data) {
  let errors = {};

  //Primero verificamos que los elementos existan
  data.text = !isEmpty(data.text) ? data.text : "";

  //Realizamos las validaciones para cada uno de los elementos

  if(!Validator.isLength(data.text, {min: 10, max: 300})) {
    errors.text = 'Post must be between 10 and 300 characters'
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
