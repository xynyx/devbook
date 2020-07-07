"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var passport = require("passport");
var Profile_1 = require("../../models/Profile");
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
 * ? Create new profile
 * ! PRIVATE
 * Using JWT allows us not to have specify user Id (eg. api/profile/:id) -> receives JWT payload with user information instead
 */
router.post("/", passport.authenticate("jwt", { session: false }), function (req, res) {
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
    var userInfo = req.body;
    console.log('userInfo BEFORE', userInfo);
    for (var property in userInfo) {
        if (!userInfo[property]) {
            delete userInfo[property];
        }
    }
    console.log('userInfo', userInfo);
    debugger;
    // profileFields.user = req.user.id
    // .catch((err: any) => res.status(404).json(err));
});
module.exports = router;
//# sourceMappingURL=profile.js.map