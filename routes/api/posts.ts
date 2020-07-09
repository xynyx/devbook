import express from "express";
const passport = require("passport");
const router = express.Router();

import { Post } from "../../models/Posts";
import { Profile } from "../../models/Profile";
import validatePostInput from "../../validation/post";

/**
 * * GET api/posts/test
 * ? Tests POST route
 */
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

/**
 * * GET api/posts
 * ? Get posts
 */
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts: Object[]) => res.json(posts))
    .catch((err: any) => res.status(404).json("No posts found."));
});

/**
 * * GET api/posts/:id
 * ? Get posts by id
 */
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post: any) => res.json(post))
    .catch((err: any) => res.status(404).json("No post found."));
});

/**
 * * POST api/posts
 * ? Create post
 * ! PRIVATE
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req: any, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    console.log("req.body", req.body);

    const { text, name } = req.body;

    const newPost = new Post({
      text,
      name,
      avatar: req.user.avatar,
      user: req.user.id,
    });

    newPost
      .save()
      .then((post: any) => res.json(post))
      .catch((err: any) => res.status(404).json(err));
  }
);

/**
 * * DELETE api/posts/:id
 * ? Delete post
 * ! PRIVATE
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req: any, res) => {
    Profile.findOne({ user: req.user.id }).then((profile: any) => {
      if (!profile) res.status(400).json("You have no profile!");
      Post.findById(req.params.id)
        .then((post: any) => {
          console.log("post", post);
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json("User not authorized.");
          }
          post.remove().then(() => res.json("Successfully deleted."));
        })
        .catch((err: any) => res.status(404).json(err));
    });
  }
);

/**
 * * POST api/posts/like/:id
 * ? Like post
 * ! PRIVATE
 */
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req: any, res) => {
    const user = req.user.id;
    console.log("user", user);
    Profile.findOne({ user }).then((profile: any) => {
      if (!profile) res.status(400).json("You have no profile!");
      console.log("req.params.id", req.params.id);
      Post.findById(req.params.id)
        .then((post: any) => {
          console.log("post", post);
          if (
            post.likes.filter((like: any) => like.user.toString() === user)
              .length > 0
          ) {
            return res.status(400).json("You already liked this post!");
          }

          post.likes.unshift({ user });

          post.save().then((post: any) => res.json(post));
        })
        .catch((err: any) => res.status(404).json(err));
    });
  }
);

/**
 * * POST api/posts/unlike/:id
 * ? Un-like post
 * ! PRIVATE
 */
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req: any, res) => {
    const user = req.user.id;
    console.log("user", user);
    Profile.findOne({ user }).then((profile: any) => {
      if (!profile) res.status(400).json("You have no profile!");
      console.log("req.params.id", req.params.id);
      Post.findById(req.params.id)
        .then((post: any) => {
          console.log("post", post);
          if (
            post.likes.filter((like: any) => like.user.toString() === user)
              .length === 0
          ) {
            return res.status(400).json("You haven't liked this post yet!");
          }

          const indexOfLike = post.likes
            .map((item: any) => item.user.toString())
            .indexOf(req.user.id);

          post.likes.splice(indexOfLike, 1);

          post.save().then((post: any) => res.json(post));
        })
        .catch((err: any) => res.status(404).json(err));
    });
  }
);

module.exports = router;
