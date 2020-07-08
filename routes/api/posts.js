"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
var express_1 = __importDefault(require("express"));
var mongoose = require("mongoose");
var passport = require("passport");
var router = express_1.default.Router();
var Posts_1 = require("../../models/Posts");
var post_1 = __importDefault(require("../../validation/post"));
// module.exports = (db) => {
//   router.get("/test", (req, res) => res.json({ msg: "Posts works" }));
//   return router;
// };
/**
 * * GET api/posts/test
 * ? Tests POST route
 */
router.get("/test", function (req, res) { return res.json({ msg: "Posts works" }); });
/**
 * * POST api/posts
 * ? Create post
 * ! PRIVATE
 */
router.post("/", passport.authenticate("jwt", { session: false }), function (req, res) {
    var _a = post_1.default(req.body), errors = _a.errors, isValid = _a.isValid;
    if (!isValid)
        return res.status(400).json(errors);
    console.log("req.body", req.body);
    var _b = req.body, text = _b.text, name = _b.name, avatar = _b.avatar, user = _b.user;
    var newPost = new Posts_1.Post({ text: text, name: name, avatar: avatar, user: user });
    newPost
        .save()
        .then(function (post) { return res.json(post); })
        .catch(function (err) { return res.status(404).json(err); });
});
module.exports = router;
//# sourceMappingURL=posts.js.map