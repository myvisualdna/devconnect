const express = require("express");
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//Load Validator
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Importamos User model
const User = require("../../models/User");

//Aca vamos de especificar que sucede cuando accedemos a la ruta 'api/users/test
//'api/users/ ya esta especificado, aqui solo agregamos '/test

//  @route GET api/public/test
//  @desc Testing Public Route
//  @access Public
router.get("/test", (req, res) => res.json({ message: "Users works" }));

//  @route GET api/public/register
//  @desc Register User
//  @access Public
router.post("/register", (req, res) => {
  //Primero le damos acceso al body de lo que llega desde el cliente al validador
  const { errors, isValid } = validateRegisterInput(req.body);

  //Hacemos la validacion
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Le indicamos que queremos buscar entre los emails ya registrados, si coincide con lo que viene desde el input email ingresado en el cliente
  User.findOne({ email: req.body.email }).then((user) => {
    //Si ese user ya existe, devolvemos un estado 400
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      //Si no existe, creamos un usuario usando el "user" model (tambien seteamos un avatar por default)
      let avatar = gravatar.url(
        req.body.email,
        { s: "100", r: "x", d: "retro" }
      );
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password,
      });

      //Encriptamos el password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//  @route GET api/public/login
//  @desc Login User / returning JWT Token
//  @access Public
router.post("/login", (req, res) => {
  //Primero le damos acceso al body de lo que llega desde el cliente al validador
  const { errors, isValid } = validateLoginInput(req.body);

  //Hacemos la validacion
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Buscar usuario por email (usamos nuestros user model)
  User.findOne({ email }).then((user) => {
    //Chequeamos si existe user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //Chequeamos si el password ingreado en el cliente coincide con el registrado en MongoDB. El password ingresado es texto y el guardado en la DB es 'hash', tenemos que usar bcrypt para desencriptar y comparar
    bcrypt
      .compare(password, user.password)
      //Si existe un match entre ambos passwords
      .then((isMatch) => {
        if (isMatch) {
          //Si coincide, vamos a generar un JWT Token

          //Creamos el JWT Payload
          const payload = { id: user.id, name: user.name, avatar: user.avatar }; //

          //Sign the token
          jwt.sign(
            payload,
            process.env.SECRETJWT,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
  });
});

//  @route GET api/public/current
//  @desc Return current user
//  @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
