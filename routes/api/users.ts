import express from "express";
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
import { User } from "../../models/User";
import validateRegisterInput from "../../validation/register";
import validateLoginInput from "../../validation/login";
// const User = require("../../models/User");

/**
 * * GET api/users/test
 * ? Tests POST route
 */
router.get("/test", (req, res) => res.json("Users works"));

/**
 * * GET api/users/register
 * ? Register User
 */

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(404).json(errors);

  User.findOne({ email: req.body.email }).then((user: string) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
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
              const { id, name, avatar } = user;
              const payload = { id, name, avatar };
              jwt.sign(
                payload,
                process.env.SECRET,
                { expiresIn: "4h" },
                (err: string, token: string) => {
                  // Token is then later sent as a header to validate user
                  res.json({ success: true, token: "Bearer " + token });
                }
              );
            })
            .catch((err: any) => console.log(err));
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
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(404).json(errors);

  const { email, password } = req.body;

  User.findOne({ email }).then((user: any) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //Check Password
    bcrypt.compare(password, user.password).then((authenticated: boolean) => {
      if (authenticated) {
        // Sign Token - take in info; expiration
        const { id, name, avatar } = user;
        // JWT Payload
        const payload = { id, name, avatar };
        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: "4h" },
          (err: string, token: string) => {
            // Token is then later sent as a header to validate user
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
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
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req: any, res) => {
    res.json(req.user);
  }
);
module.exports = router;
