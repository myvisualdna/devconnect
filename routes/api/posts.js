const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Importamos el Post Model
const Post = require("../../models/posts");
//Importamos el Profile Model
const Profile = require("../../models/profile");

//Importamos la validation
const validatePostInput = require("../../validation/post");

//Aca vamos de especificar que sucede cuando accedemos a la ruta 'api/posts/test
//'api/posts/ ya esta especificado, aqui solo agregamos '/test

//  @route GET api/posts/test
//  @desc Test post route
//  @access Public
router.get("/test", (req, res) => res.json({ message: "Posts works" }));

//  @route GET api/posts
//  @desc Get post
//  @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostfound: "No post found" }));
});

//  @route GET api/posts/:id
//  @desc Get post
//  @access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that ID." })
    );
});

//  @route POST api/posts
//  @desc Create post
//  @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Chequeamos validation
    if (!isValid) {
      //Si hay algun error mandamos un error 400
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });
    newPost.save().then((post) => res.json(post));
  }
);

//  @route DELETE api/posts/:id
//  @desc Delete post
//  @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          //Chequeamos que quien esta esta borrando el post sea el dueño del post
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ noauthorized: "User not authorized" });
          }

          //Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

//  @route POST api/posts/like/:id
//  @desc Like post
//  @access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          //Chequeamos si el post ya fue likeado por el user
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // Agregamos el like al array de likes
          post.likes.unshift({ user: req.user.id });

          //Guardamos el like para ese post
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

//  @route POST api/posts/unlike/:id
//  @desc Unlike post
//  @access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // Get remove index (individualizamos el like que queremos sacar)
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          // Sacamos el like del array
          post.likes.splice(removeIndex, 1);

          // Guardamos
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Chequeamos validation
    if (!isValid) {
      // SI hay algun error, devolvemos status 400
      return res.status(400).json(errors);
    }

    //Si no hay error, añadimos el comentario utilizando el model para comentarios

    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        // Agregamos el comentario al array de comentarios
        post.comments.unshift(newComment);

        // Guardamos
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        // Chequeamos si el comentario a eleminar efectivamente existe
        //Si no existe...
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Si el comentario existe, lo identificamos dentro del array de comentarios
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        // Lo sacamos del array de comentarios
        post.comments.splice(removeIndex, 1);

        //Guardamos
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
