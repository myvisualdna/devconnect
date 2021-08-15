const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
require("dotenv").config();
const app = express();


//Body parser middleware
//(Nos permite acceder req.body.loquesea)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Importing routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

//Connect to MongoDb
const uri = `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORDDB}@cluster0.xnvdl.mongodb.net/devconnect?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log("Error db:", e));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//Using routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

////////HEROKU////////////
//Configuracion para el modo produccion (para que Heroku lance la app)
//Serve static assets if in production
if(process.env.NODE_ENV === "production") {
  // Aqui se especifica los archivos estaticos que debe servir
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
