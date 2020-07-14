"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// const dotenv = require("dotenv");
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var users = require("./routes/api/users");
var profile = require("./routes/api/profile");
var posts = require("./routes/api/posts");
var passport = require("passport");
var app = express_1.default();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var db = process.env.MONGO_URI;
mongoose
    .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(function () { return console.log("connected"); })
    .catch(function (err) { return console.log(err); });
// Init passport middleware
app.use(passport.initialize());
// Passport config - pass in passport as parameter
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log("Server running on port " + PORT); });
