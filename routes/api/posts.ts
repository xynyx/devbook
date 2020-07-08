// const express = require("express");
import express from "express"
const mongoose = require('mongoose');
const passport = require("passport");
const router = express.Router();

import { Posts } from "../../models/Posts";

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
 */
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
  
})

module.exports = router;
