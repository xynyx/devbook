"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var gravatar = require("gravatar");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var passport = require("passport");
var User_1 = require("../../models/User");
var register_1 = __importDefault(require("../../validation/register"));
var login_1 = __importDefault(require("../../validation/login"));
// const User = require("../../models/User");
/**
 * * GET api/users/test
 * ? Tests POST route
 */
router.get("/test", function (req, res) { return res.json({ msg: "Users works" }); });
/**
 * * GET api/users/register
 * ? Register User
 */
router.post("/register", function (req, res) {
    var _a = register_1.default(req.body), errors = _a.errors, isValid = _a.isValid;
    if (!isValid)
        return res.status(404).json(errors);
    User_1.User.findOne({ email: req.body.email }).then(function (user) {
        if (user) {
            errors.email = "Email already exists";
            return res.status(400).json(errors);
        }
        else {
            var avatar = gravatar.url(req.body.email, {
                s: "200",
                d: "mm",
            });
            var newUser_1 = new User_1.User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password,
            });
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser_1.password, salt, function (err, hash) {
                    if (err)
                        throw err;
                    newUser_1.password = hash;
                    newUser_1
                        .save()
                        .then(function (user) {
                        var id = user.id, name = user.name, avatar = user.avatar;
                        var payload = { id: id, name: name, avatar: avatar };
                        jwt.sign(payload, process.env.SECRET, { expiresIn: "4h" }, function (err, token) {
                            // Token is then later sent as a header to validate user
                            res.json({ success: true, token: token });
                        });
                    })
                        .catch(function (err) { return console.log(err); });
                });
            });
        }
    });
});
/**
 * * GET api/users/login
 * ? Log in User / Return JWT Token
 */
router.post("/login", function (req, res) {
    var _a = login_1.default(req.body), errors = _a.errors, isValid = _a.isValid;
    if (!isValid)
        return res.status(404).json(errors);
    var _b = req.body, email = _b.email, password = _b.password;
    User_1.User.findOne({ email: email }).then(function (user) {
        if (!user) {
            errors.email = "User not found";
            return res.status(404).json(errors);
        }
        //Check Password
        bcrypt.compare(password, user.password).then(function (authenticated) {
            if (authenticated) {
                // Sign Token - take in info; expiration
                var id = user.id, name_1 = user.name, avatar = user.avatar;
                // JWT Payload
                var payload = { id: id, name: name_1, avatar: avatar };
                jwt.sign(payload, process.env.SECRET, { expiresIn: "4h" }, function (err, token) {
                    // Token is then later sent as a header to validate user
                    res.json({ success: true, token: token });
                });
            }
            else {
                errors.password = "Wrong password";
                return res.status(400).json(errors);
            }
        });
    });
});
/**
 * * GET api/users/current
 * ? Return Current User
 * ! PRIVATE
 */
router.get("/current", passport.authenticate("jwt", { session: false }), function (req, res) {
    res.json(req.user);
});
module.exports = router;
