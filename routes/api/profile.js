const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

//Importamos el model que vamos a utilizar
const Profile = require("../../models/profile");
//Importamos el model que vamos a utilizar
const User = require("../../models/User");

//Aca vamos de especificar que sucede cuando accedemos a la ruta 'api/profile/test
//'api/profile/ ya esta especificado, aqui solo agregamos '/test

//  @route GET api/profile/test
//  @desc Test profile route
//  @access Public
router.get("/test", (req, res) => res.json({ message: "Profile works" }));

//  @route GET api/profile
//  @desc Get current users profile
//  @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

//  @route GET api/profile/all
//  @desc Get all profiles
//  @access Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noProfile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch((err) => res.status(404).json({ profile: "There are no profiles" }));
});

//  @route GET api/profile/handle/:handle
//  @desc Get profile by handle
//  @access Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  //Buscamos el profile en la DB de acuerdo al handle que recibimos en la URL
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      //Si no hay profile, devolvemos un mensaje de error
      if (!profile) {
        errors.noprofile = "There's no profile for this user";
        res.status(404).json(errors);
      }
      //Si hay un profile, devolvemos el profile
      res.json(profile);
    })
    .catch((err) => status(404).json(err));
});

//  @route GET api/profile/user/:user_id
//  @desc Get profile by user ID
//  @access Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  //Buscamos el profile en la DB de acuerdo al handle que recibimos en la URL
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      //Si no hay profile, devolvemos un mensaje de error
      if (!profile) {
        errors.noprofile = "There's no profile for this user";
        res.status(404).json(errors);
      }
      //Si hay un profile, devolvemos el profile
      res.json(profile);
    })
    .catch((err) =>
      status(404).json({ profile: "There's no profile for this user" })
    );
});

//  @route POST api/profile
//  @desc Create or edit user profile
//  @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    //Get Fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.github) profileFields.github = req.body.github;
    if (req.body.status) profileFields.status = req.body.status;

    //Skills - Dividir en array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    //Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.youtube;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        //Actualizamos el profile y respondemos con el profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        //Crear Profile

        //Chequear si el profile existe
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(error);
          }

          //Guardar Profile
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);

//  @route POST api/profile/experience
//  @desc Add experience to profile
//  @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      //Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then((profile) => res.json(profile));
    });
  }
);

//  @route POST api/profile/education
//  @desc Add education to profile
//  @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then((profile) => res.json(profile));
    });
  }
);

//  @route DELETE api/profile/experience
//  @desc Delete experience to profile
//  @access Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        //Get remove index
        const removeIndex = profile.experience
          .map((item) => item.id)
          .indexOf(req.params.exp_id);

        //Splice out of array
        profile.experience.splice(removeIndex, 1);

        //Save
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);

//  @route DELETE api/profile/education
//  @desc Delete education to profile
//  @access Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        //Get remove index
        const removeIndex = profile.education
          .map((item) => item.id)
          .indexOf(req.params.edu_id);

        //Splice out of array
        profile.education.splice(removeIndex, 1);

        //Save
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);

//  @route DELETE api/profile
//  @desc Delete user and profile
//  @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndDelete({ user: req.user.id }).then(() => {
      User.findOneAndDelete({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
