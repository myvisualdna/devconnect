const express = require("express");
const router = express.Router();

//Aca vamos de especificar que sucede cuando accedemos a la ruta 'api/profile/test
//'api/profile/ ya esta especificado, aqui solo agregamos '/test

//  @route GET api/profile/test
//  @desc Test profile route
//  @access Public
router.get("/test", (req, res) => res.json({ message: "Profile works" }));

module.exports = router;
