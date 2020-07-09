"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport = require("passport");
var router = express_1.default.Router();
var Posts_1 = require("../../models/Posts");
var Profile_1 = require("../../models/Profile");
var post_1 = __importDefault(require("../../validation/post"));
/**
 * * GET api/posts/test
 * ? Tests POST route
 */
router.get("/test", function (req, res) { return res.json({ msg: "Posts works" }); });
/**
 * * GET api/posts
 * ? Get posts
 */
router.get("/", function (req, res) {
    Posts_1.Post.find()
        .sort({ date: -1 })
        .then(function (posts) { return res.json(posts); })
        .catch(function (err) { return res.status(404).json("No posts found."); });
});
/**
 * * GET api/posts/:id
 * ? Get posts by id
 */
router.get("/:id", function (req, res) {
    Posts_1.Post.findById(req.params.id)
        .then(function (post) { return res.json(post); })
        .catch(function (err) { return res.status(404).json("No post found."); });
});
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
    var _b = req.body, text = _b.text, name = _b.name;
    var newPost = new Posts_1.Post({
        text: text,
        name: name,
        avatar: req.user.avatar,
        user: req.user.id,
    });
    newPost
        .save()
        .then(function (post) { return res.json(post); })
        .catch(function (err) { return res.status(404).json(err); });
});
/**
 * * DELETE api/posts/:id
 * ? Delete post
 * ! PRIVATE
 */
router.delete("/:id", passport.authenticate("jwt", { session: false }), function (req, res) {
    Profile_1.Profile.findOne({ user: req.user.id }).then(function (profile) {
        if (!profile)
            res.status(400).json("You have no profile!");
        Posts_1.Post.findById(req.params.id)
            .then(function (post) {
            console.log("post", post);
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json("User not authorized.");
            }
            post.remove().then(function () { return res.json("Successfully deleted."); });
        })
            .catch(function (err) { return res.status(404).json(err); });
    });
});
/**
 * * POST api/posts/like/:id
 * ? Like post
 * ! PRIVATE
 */
router.post("/like/:id", passport.authenticate("jwt", { session: false }), function (req, res) {
    var user = req.user.id;
    console.log("user", user);
    Profile_1.Profile.findOne({ user: user }).then(function (profile) {
        if (!profile)
            res.status(400).json("You have no profile!");
        console.log("req.params.id", req.params.id);
        Posts_1.Post.findById(req.params.id)
            .then(function (post) {
            console.log('post', post);
            if (post.likes.filter(function (like) { return like.user.toString() === user; })
                .length > 0) {
                return res.status(400).json("You already liked this post!");
            }
            post.likes.unshift({ user: user });
            post.save().then(function (post) { return res.json(post); });
        })
            .catch(function (err) { return res.status(404).json(err); });
    });
});
module.exports = router;
//# sourceMappingURL=posts.js.map