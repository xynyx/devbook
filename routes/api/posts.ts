// const express = require("express");
import express from "express";
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

import { Post } from "../../models/Posts";
import validatePostInput from "../../validation/post"

// module.exports = (db) => {
//   router.get("/test", (req, res) => res.json({ msg: "Posts works" }));
//   return router;
// };

/**
 * * GET api/posts/test
 * ? Tests POST route
 */
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

/**
 * * POST api/posts
 * ? Create post
 * ! PRIVATE
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    console.log("req.body", req.body);
    const { text, name, avatar, user } = req.body;
    const newPost = new Post({ text, name, avatar, user });

    newPost
      .save()
      .then((post: any) => res.json(post))
      .catch((err: any) => res.status(404).json(err));
  }
);

module.exports = router;
