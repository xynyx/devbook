const express = require("express");
const router = express.Router();

// module.exports = (db) => {
//   router.get("/test", (req, res) => res.json({ msg: "Posts works" }));
//   return router;
// };

router.get("/test", (req, res) => res.json({ msg: "Posts works" }));
module.exports = router;
