"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
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
app.use(bodyParser.urlencoded({ extended: false }));
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
//# sourceMappingURL=server.js.map