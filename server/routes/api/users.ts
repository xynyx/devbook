import express from "express";
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
import { User } from "../../models/User";
// const User = require("../../models/User");

/**
 * * GET api/users/test
 * ? Tests POST route
 */
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

/**
 * * GET api/uswers/register
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

      bcrypt.genSalt(10, (err: any, salt: any) => {
        bcrypt.hash(newUser.password, salt, (err: any, hash: any) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user: any) => {
              res.json(user);
            })
            .catch((err: any) => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
