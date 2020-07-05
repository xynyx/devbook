"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
// module.exports = (db) => {
//   router.get("/test", (req, res) => res.json({ msg: "Posts works" }));
//   return router;
// };
/**
 * * GET api/posts/test
 * ? Tests POST route
 */
router.get("/test", function (req, res) { return res.json({ msg: "Posts works" }); });
module.exports = router;
