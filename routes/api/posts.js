const express = require("express");
const router = express.Router();

//Aca vamos de especificar que sucede cuando accedemos a la ruta 'api/posts/test
//'api/posts/ ya esta especificado, aqui solo agregamos '/test

//  @route GET api/posts/test
//  @desc Test post route
//  @access Public
router.get("/test", (req, res) => res.json({ message: "Posts works" }));

module.exports = router;
