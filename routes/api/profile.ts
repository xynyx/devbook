import express from "express";
const router = express.Router();
const passport = require("passport");
import { User } from "../../models/User";
import { Profile } from "../../models/Profile";
import validateProfileInput from "../../validation/profile";
import validateExperienceInput from "../../validation/experience";
import validateEducationInput from "../../validation/education";

// TODO: Stronger typing with TypeScript for profile data

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
 * * GET api/profile/user/:user_id
 * ? Find profile by user ID
 */
router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile: any) => {
      if (!profile) {
        res.status(404).json("This user does not have a profile.");
      }
      res.json(profile);
    })
    .catch((err: any) => res.status(404).json(err));
});

/**
 * * GET api/profile/handle/:handle
 * ? Find profile by handle
 */
router.get("/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile: any) => {
      if (!profile) {
        res.status(404).json("This user does not have a profile.");
      }
      res.json(profile);
    })
    .catch((err: any) => res.status(404).json(err));
});

/**
 * * GET api/profile/all
 * ? Find all profiles
 */
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles: any) => {
      if (!profiles) {
        res.status(404).json("There are no profiles.");
      }
      res.json(profiles);
    })
    .catch((err: any) => res.status(404).json(err));
});

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

    // Convert comma separated values into array
    //! This may need fixing
    userInfo.skills = userInfo.skills.split(",");
    for (const property in userInfo) {
      // Skip user key as that information is always required
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
        )
          .then((profile: any) => res.json(profile))
          .catch((err: any) => res.status(404).json(err));
      } else {
        // Create profile
        // Does 'handle' exist
        Profile.findOne({ handle: userInfo.handle })
          .then((handle: any) => {
            if (handle) {
              return res
                .status(400)
                .json({ exists: "That handle already exists." });
            } else {
              // userInfo.user._id = req.user.id;
              new Profile(userInfo)
                .save()
                .then((profile: any) => res.json(profile))
                .catch((err: any) => res.json(err));
            }
          })
          .catch((err: any) => res.status(404).json(err));
      }
    });
  }
);

/**
 * * POST api/profile/experience
 * ? Add experience to profile
 * ! PRIVATE
 */
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req: any, res) => {
    Profile.findOne({ user: req.user.id }).then((profile: any) => {
      console.log("req.body", req.body);

      const { errors, isValid } = validateExperienceInput(req.body);

      // Check valid
      if (!isValid) {
        return res.status(400).json(errors);
      }

      profile.experience.unshift(req.body);
      profile.save().then((profile: any) => {
        res.json(profile);
      });
    });
  }
);

/**
 * * DELETE api/profile/education/:edu_id
 * ? Delete education in profile
 * ! PRIVATE
 */
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req: any, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile: any) => {
        const indexOfExperience = profile.education
          .map((exp: any) => exp.id)
          .indexOf(req.params.edu_id);
        // Remove education
        if (indexOfExperience === -1)
          return res.status(404).json("This experience no longer exists.");
        profile.education.splice(indexOfExperience, 1);

        profile
          .save()
          .then((profile: any) => res.json(profile))
          .catch((err: any) => res.status(400).json(err));
      })
      .catch((err: any) => res.status(404).json(err));
  }
);

/**
 * * DELETE api/profile/education
 * ? Add education to profile
 * ! PRIVATE
 */
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req: any, res) => {
    Profile.findOne({ user: req.user.id }).then((profile: any) => {
      const { errors, isValid } = validateEducationInput(req.body);

      // Check valid
      if (!isValid) {
        return res.status(400).json(errors);
      }

      profile.education.unshift(req.body);
      profile.save().then((profile: any) => {
        res.json(profile);
      });
    });
  }
);

/**
 * * DELETE api/profile/experience/:exp_id
 * ? Delete experience in profile
 * ! PRIVATE
 */
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req: any, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile: any) => {
        const indexOfExperience = profile.experience
          .map((exp: any) => exp.id)
          .indexOf(req.params.exp_id);
        // Splice will delete the last entry with an index of -1 if it doesn't exist; return to prevent
        if (indexOfExperience === -1)
          return res.status(404).json("This experience no longer exists.");
        // Remove experience
        profile.experience.splice(indexOfExperience, 1);

        profile
          .save()
          .then((profile: any) => res.json(profile))
          .catch((err: any) => res.status(400).json(err));
      })
      .catch((err: any) => res.status(404).json(err));
  }
);

/**
 * * DELETE api/profile
 * ? Delete both profile and user
 * ! PRIVATE
 */

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req: any, res) => {
    Profile.findOneAndRemove({ use: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id })
          .then(() => {
            res.json("User and profile deleted successfully.");
          })
          .catch((err: any) => res.status(404).json(err));
      })
      .catch((err: any) => res.status(404).json(err));
  }
);
module.exports = router;
