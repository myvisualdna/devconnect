const express = require("express");
const router = express.Router();

//Aca vamos de especificar que sucede cuando accedemos a la ruta 'api/users/test
//'api/users/ ya esta especificado, aqui solo agregamos '/test

//  @route GET api/public/test
//  @desc Test public route
//  @access Public
router.get("/test", (req, res) => res.json({ message: "Users works" }));

module.exports = router;
