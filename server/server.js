"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var bodyParser = require("body-parser");
// import User from "./models/User";
var users = require("./routes/api/users");
var profile = require("./routes/api/profile");
var posts = require("./routes/api/posts");
var app = express_1.default();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var db = require("./config/keys").mongoURI;
mongoose_1.default
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () { return console.log("connected"); })
    .catch(function (err) { return console.log(err); });
app.get("/", function (req, res) { return res.send("Hello"); });
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log("Server running on port " + PORT); });
