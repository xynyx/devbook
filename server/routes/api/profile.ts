import express from "express";
const router = express.Router();
const passport = require("passport");
import { User } from "../../models/User";
import { Profile } from "../../models/Profile";

// Load Profile Model
// const Profile = require("../../models/Profile");
// const User = require("../../models/User");

/**
 * * GET api/profile/test
 * ? Tests POST route
 */
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

/**
 * * GET api/profile
 * ? Get current user profile
 * ! PRIVATE
 * Using JWT allows us not to have specify user Id (eg. api/profile/:id) -> receives JWT payload with user information instead
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req: any, res: any) => {
    Profile.findOne({ user: req.user.id })
      .then((profile: any) => {
        if (!profile) {
          return res.status(404).json({ noprofile: "No profile found" });
        }
        res.json(profile);
      })
      .catch((err: any) => res.status(404).json(err));
  }
);

/**
 * * POST api/profile
 * ? Create new profile
 * ! PRIVATE
 * Using JWT allows us not to have specify user Id (eg. api/profile/:id) -> receives JWT payload with user information instead
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req: any, res: any) => {
    // const profileFields = {};
    // const {
    //   handle,
    //   user,
    //   company,
    //   website,
    //   location,
    //   status,
    //   skills,
    //   bio,
    //   githubUsername,
    // } = req.body;
    const userInfo = req.body;
    console.log("userInfo BEFORE", userInfo);

    // Convert comma separated values into array
    userInfo.skills.split(",");
    for (const property in userInfo) {
      if (
        property === "experience" ||
        property === "education" ||
        property === "social"
      ) {
        for (const innerProperty in userInfo[property]) {
          if (!userInfo[innerProperty]) {
            delete userInfo[innerProperty];
          }
        }
      }
      if (!userInfo[property]) {
        delete userInfo[property];
      }
    }

    //exp, edu, soc
    console.log("userInfo", userInfo);
    debugger;
    // profileFields.user = req.user.id
    // .catch((err: any) => res.status(404).json(err));
  }
);

module.exports = router;
