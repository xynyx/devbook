import express from "express";
const router = express.Router();
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");
const User = require("../../models/User");


/**
 * * GET api/profile/test
 * ? Tests POST route
 */
router.get("/test", (req, res) => res.json({msg: "Profile works"}))

/**
 * * GET api/profile 
 * ? Get current user profile
 * ! PRIVATE
 * Using JWT allows us not to have specify user Id (eg. api/profile/:id) -> receives JWT payload with user information instead
 */

module.exports = router;