"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var passport = require("passport");
var Profile_1 = require("../../models/Profile");
var profile_1 = __importDefault(require("../../validation/profile"));
// Load Profile Model
// const Profile = require("../../models/Profile");
// const User = require("../../models/User");
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
        .then(function (profile) {
        if (!profile) {
            return res.status(404).json({ noprofile: "No profile found" });
        }
        res.json(profile);
    })
        .catch(function (err) { return res.status(404).json(err); });
});
/**
 * * POST api/profile
 * ? Create/edit profile
 * ! PRIVATE
 * Using JWT allows us not to have specify user Id (eg. api/profile/:id) -> receives JWT payload with user information instead
 */
router.post("/", passport.authenticate("jwt", { session: false }), function (req, res) {
    var _a;
    var _b = profile_1.default(req.body), errors = _b.errors, isValid = _b.isValid;
    // Check valid
    if (!isValid) {
        return res.status(400).json(errors);
    }
    var userInfo = req.body;
    console.log("userInfo BEFORE", userInfo);
    // Convert comma separated values into array
    // userInfo.skills.split(",");
    //! This may need fixing
    userInfo.skills = userInfo.skills.split(",");
    for (var property in userInfo) {
        if (property === "user")
            continue;
        // if (property === "social") {
        //   if (Object.keys(userInfo[property]).length === 0) {
        //     delete userInfo[property];
        //     continue;
        //   }
        //   // for (const innerProperty in userInfo[property]) {
        //   //   if (!userInfo[innerProperty]) {
        //   //     delete userInfo[innerProperty];
        //   //   }
        //   // }
        // }
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
            Profile_1.Profile.findOneAndUpdate({ user: req.user.id }, { $set: userInfo }, { new: true, useFindAndModify: true }).then(function (profile) { return res.json(profile); });
        }
        else {
            // Create profile
            // Does 'handle' exist
            Profile_1.Profile.findOne({ handle: userInfo.handle }).then(function (handle) {
                if (handle) {
                    return res
                        .status(400)
                        .json({ exists: "That handle already exists." });
                }
                else {
                    userInfo.user.id = req.user.id;
                    new Profile_1.Profile(userInfo)
                        .save()
                        .then(function (profile) { return res.json(profile); });
                }
            });
        }
    });
    //exp, edu, soc
    console.log("userInfo", userInfo);
    // profileFields.user = req.user.id
    // .catch((err: any) => res.status(404).json(err));
});
module.exports = router;
//# sourceMappingURL=profile.js.map