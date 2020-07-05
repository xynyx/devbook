"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
/**
 * * GET api/profile/test
 * ? Tests POST route
 */
router.get("/test", function (req, res) { return res.json({ msg: "Profile works" }); });
module.exports = router;
