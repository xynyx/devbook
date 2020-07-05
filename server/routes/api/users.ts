import express from "express";
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { User } from "../../models/User";
// const User = require("../../models/User");

/**
 * * GET api/users/test
 * ? Tests POST route
 */
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

/**
 * * GET api/users/register
 * ? Register User
 */

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user: string) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        d: "mm", // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err: string, salt: number) => {
        bcrypt.hash(newUser.password, salt, (err: string, hash: string) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user: any) => {
              res.json(user);
            })
            .catch((err: string) => console.log(err));
        });
      });
    }
  });
});

/**
 * * GET api/users/login
 * ? Log in User / Return JWT Token
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user: any) => {
    if (!user) return res.status(404).json({ email: "User not found" });

    //Check Password
    bcrypt.compare(password, user.password).then((authenticated: boolean) => {
      if (authenticated) {
        res.json({ msg: "Success" });
        // Sign Token - take in info; expiration
        const { id, name, avatar } = user;
        // JWT Payload
        const payload = { id, name, avatar };
        jwt.sign(payload, );
      } else {
        return res.status(400).json({ pwd: "Wrong password" });
      }
    });
  });
});

module.exports = router;
