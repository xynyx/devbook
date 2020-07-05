// const express = require("express");
import express from "express"
const router = express.Router();

// module.exports = (db) => {
//   router.get("/test", (req, res) => res.json({ msg: "Posts works" }));
//   return router;
// };

/**
 * * GET api/posts/test
 * ? Tests POST route
 */
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

module.exports = router;
