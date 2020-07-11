"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var passport = require("passport");
var User_1 = require("../../models/User");
var Profile_1 = require("../../models/Profile");
var profile_1 = __importDefault(require("../../validation/profile"));
var experience_1 = __importDefault(require("../../validation/experience"));
var education_1 = __importDefault(require("../../validation/education"));
// TODO: Stronger typing with TypeScript for profile data
/**
 * * GET api/profile/test
 * ? Tests POST route
 */
router.get("/test", function (req, res) { return res.json({ msg: "Profile works" }); });
/**
 * * GET api/profile
 * ? Get current user profile
 * ! PRIVATE
 * Using JWT allows us not to have specify user Id (eg. api/profile/:id) -> receives JWT payload with user information instead
 */
router.get("/", passport.authenticate("jwt", { session: false }), function (req, res) {
    Profile_1.Profile.findOne({ user: req.user.id })
        // Populates name and avatar field (leaving out email) when finding this data, otherwise it won't be included
        .populate("user", ["name", "avatar"])
        .then(function (profile) {
        if (!profile) {
            return res.status(404).json({ noprofile: "No profile found" });
        }
        res.json(profile);
    })
        .catch(function (err) { return res.status(404).json(err); });
});
/**
 * * GET api/profile/user/:user_id
 * ? Find profile by user ID
 */
router.get("/user/:user_id", function (req, res) {
    Profile_1.Profile.findOne({ user: req.params.user_id })
        .populate("user", ["name", "avatar"])
        .then(function (profile) {
        if (!profile) {
            res.status(404).json("This user does not have a profile.");
        }
        res.json(profile);
    })
        .catch(function (err) { return res.status(404).json(err); });
});
/**
 * * GET api/profile/handle/:handle
 * ? Find profile by handle
 */
router.get("/handle/:handle", function (req, res) {
    Profile_1.Profile.findOne({ handle: req.params.handle })
        .populate("user", ["name", "avatar"])
        .then(function (profile) {
        if (!profile) {
            res.status(404).json("This user does not have a profile.");
        }
        res.json(profile);
    })
        .catch(function (err) { return res.status(404).json(err); });
});
/**
 * * GET api/profile/all
 * ? Find all profiles
 */
router.get("/all", function (req, res) {
    Profile_1.Profile.find()
        .populate("user", ["name", "avatar"])
        .then(function (profiles) {
        if (!profiles) {
            res.status(404).json("There are no profiles.");
        }
        res.json(profiles);
    })
        .catch(function (err) { return res.status(404).json(err); });
});
/**
 * * POST api/profile
 * ? Create/edit profile
 * ! PRIVATE
 * Using JWT allows you to not have to specify user Id (eg. api/profile/:id) -> receives JWT payload with user information instead
 */
router.post("/", passport.authenticate("jwt", { session: false }), function (req, res) {
    var _a;
    var _b = profile_1.default(req.body), errors = _b.errors, isValid = _b.isValid;
    // Check valid
    if (!isValid) {
        return res.status(400).json(errors);
    }
    var userInfo = req.body;
    // Convert comma separated values into array
    //! This may need fixing
    userInfo.skills = userInfo.skills.split(",");
    for (var property in userInfo) {
        // Skip user key as that information is always required
        if (property === "user")
            continue;
        // If property is a social network, must build social key and add the property to social
        if (property === "twitter" ||
            property === "instagram" ||
            property === "linkedIn") {
            // Computed property syntax
            // Creates key based on property name with the value
            if (userInfo.social) {
                userInfo.social["" + property] = userInfo[property];
            }
            else {
                userInfo.social = (_a = {}, _a["" + property] = userInfo[property], _a);
            }
        }
        // If the property hasn't been inputted by user (and isn't required), delete that key for the new userInfo object
        if (!userInfo[property]) {
            delete userInfo[property];
        }
    }
    Profile_1.Profile.findOne({ user: req.user.id }).then(function (profile) {
        // Update profile
        if (profile) {
            Profile_1.Profile.findOneAndUpdate({ user: req.user.id }, { $set: userInfo }, { new: true, useFindAndModify: true })
                .then(function (profile) { return res.json(profile); })
                .catch(function (err) { return res.status(404).json(err); });
        }
        else {
            // Create profile
            // Does 'handle' exist
            Profile_1.Profile.findOne({ handle: userInfo.handle })
                .then(function (handle) {
                if (handle) {
                    return res
                        .status(400)
                        .json({ exists: "That handle already exists." });
                }
                else {
                    new Profile_1.Profile(userInfo)
                        .save()
                        .then(function (profile) { return res.json(profile); })
                        .catch(function (err) { return res.json(err); });
                }
            })
                .catch(function (err) { return res.status(404).json(err); });
        }
    });
});
/**
 * * POST api/profile/experience
 * ? Add experience to profile
 * ! PRIVATE
 */
router.post("/experience", passport.authenticate("jwt", { session: false }), function (req, res) {
    Profile_1.Profile.findOne({ user: req.user.id }).then(function (profile) {
        console.log("req.body", req.body);
        var _a = experience_1.default(req.body), errors = _a.errors, isValid = _a.isValid;
        // Check valid
        if (!isValid) {
            return res.status(400).json(errors);
        }
        profile.experience.unshift(req.body);
        profile.save().then(function (profile) {
            res.json(profile);
        });
    });
});
/**
 * * DELETE api/profile/education/:edu_id
 * ? Delete education in profile
 * ! PRIVATE
 */
router.delete("/education/:edu_id", passport.authenticate("jwt", { session: false }), function (req, res) {
    Profile_1.Profile.findOne({ user: req.user.id })
        .then(function (profile) {
        var indexOfExperience = profile.education
            .map(function (exp) { return exp.id; })
            .indexOf(req.params.edu_id);
        // Remove education
        if (indexOfExperience === -1)
            return res.status(404).json("This experience no longer exists.");
        profile.education.splice(indexOfExperience, 1);
        profile
            .save()
            .then(function (profile) { return res.json(profile); })
            .catch(function (err) { return res.status(400).json(err); });
    })
        .catch(function (err) { return res.status(404).json(err); });
});
/**
 * * DELETE api/profile/education
 * ? Add education to profile
 * ! PRIVATE
 */
router.post("/education", passport.authenticate("jwt", { session: false }), function (req, res) {
    Profile_1.Profile.findOne({ user: req.user.id }).then(function (profile) {
        var _a = education_1.default(req.body), errors = _a.errors, isValid = _a.isValid;
        // Check valid
        if (!isValid) {
            return res.status(400).json(errors);
        }
        profile.education.unshift(req.body);
        profile.save().then(function (profile) {
            res.json(profile);
        });
    });
});
/**
 * * DELETE api/profile/experience/:exp_id
 * ? Delete experience in profile
 * ! PRIVATE
 */
router.delete("/experience/:exp_id", passport.authenticate("jwt", { session: false }), function (req, res) {
    Profile_1.Profile.findOne({ user: req.user.id })
        .then(function (profile) {
        var indexOfExperience = profile.experience
            .map(function (exp) { return exp.id; })
            .indexOf(req.params.exp_id);
        // Splice will delete the last entry with an index of -1 if it doesn't exist; return to prevent
        if (indexOfExperience === -1)
            return res.status(404).json("This experience no longer exists.");
        // Remove experience
        profile.experience.splice(indexOfExperience, 1);
        profile
            .save()
            .then(function (profile) { return res.json(profile); })
            .catch(function (err) { return res.status(400).json(err); });
    })
        .catch(function (err) { return res.status(404).json(err); });
});
/**
 * * DELETE api/profile
 * ? Delete both profile and user
 * ! PRIVATE
 */
router.delete("/", passport.authenticate("jwt", { session: false }), function (req, res) {
    Profile_1.Profile.findOneAndRemove({ use: req.user.id })
        .then(function () {
        User_1.User.findOneAndRemove({ _id: req.user.id })
            .then(function () {
            res.json("User and profile deleted successfully.");
        })
            .catch(function (err) { return res.status(404).json(err); });
    })
        .catch(function (err) { return res.status(404).json(err); });
});
module.exports = router;
