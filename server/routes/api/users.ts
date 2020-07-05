import express from "express";
const router = express.Router();

/**
 * * GET api/users/test
 * ? Tests POST route
 */
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

module.exports = router;
