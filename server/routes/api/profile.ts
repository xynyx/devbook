import express from "express";
const router = express.Router();
const passport = require("passport");
import { User } from "../../models/User";
import { Profile } from "../../models/Profile";
import validateProfileInput from "../../validation/profile";

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
      // Populates name and avatar field (leaving out email) when finding this data, otherwise it won't be included
      .populate("user", ["name", "avatar"])
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
 * ? Create/edit profile
 * ! PRIVATE
 * Using JWT allows us not to have specify user Id (eg. api/profile/:id) -> receives JWT payload with user information instead
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req: any, res: any) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check valid
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const userInfo = req.body;
    console.log("userInfo BEFORE", userInfo);

    // Convert comma separated values into array
    // userInfo.skills.split(",");
    //! This may need fixing
    userInfo.skills = userInfo.skills.split(",");
    for (const property in userInfo) {
      if (property === "user") continue;
      // If property is a social network, must build social key and add the property to social
      if (
        property === "twitter" ||
        property === "instagram" ||
        property === "linkedIn"
      ) {
        // Computed property syntax
        // Creates key based on property name with the value
        if (userInfo.social) {
          userInfo.social[`${property}`] = userInfo[property];
        } else {
          userInfo.social = { [`${property}`]: userInfo[property] };
        }
      }
      // If the property hasn't been inputted by user (and isn't required), delete that key for the new userInfo object
      if (!userInfo[property]) {
        delete userInfo[property];
      }
    }

    Profile.findOne({ user: req.user.id }).then((profile: any) => {
      // Update profile
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: userInfo },
          { new: true, useFindAndModify: true }
        ).then((profile: any) => res.json(profile));
      } else {
        // Create profile
        // Does 'handle' exist
        Profile.findOne({ handle: userInfo.handle }).then((handle: any) => {
          if (handle) {
            return res
              .status(400)
              .json({ exists: "That handle already exists." });
          } else {
            userInfo.user.id = req.user.id;
            new Profile(userInfo)
              .save()
              .then((profile: any) => res.json(profile));
          }
        });
      }
    });

    //exp, edu, soc
    console.log("userInfo", userInfo);
    // profileFields.user = req.user.id
    // .catch((err: any) => res.status(404).json(err));
  }
);

module.exports = router;
