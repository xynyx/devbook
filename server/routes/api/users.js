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
var User_1 = require("../../models/User");
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
    User_1.User.findOne({ email: req.body.email }).then(function (user) {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
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
                        res.json(user);
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
    var _a = req.body, email = _a.email, password = _a.password;
    User_1.User.findOne({ email: email }).then(function (user) {
        if (!user)
            return res.status(404).json({ email: "User not found" });
        //Check Password
        bcrypt.compare(password, user.password).then(function (authenticated) {
            if (authenticated) {
                res.json({ msg: "Success" });
                // Sign Token - take in info; expiration
                var id = user.id, name_1 = user.name, avatar = user.avatar;
                // JWT Payload
                var payload = { id: id, name: name_1, avatar: avatar };
                jwt.sign(payload);
            }
            else {
                return res.status(400).json({ pwd: "Wrong password" });
            }
        });
    });
});
module.exports = router;
