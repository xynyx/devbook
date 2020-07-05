import express from "express";
// const dotenv = require("dotenv");
import * as dotenv from "dotenv";
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile")
const posts = require("./routes/api/posts")
const passport = require("passport");

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

const db = process.env.MONGO_URI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected"))
  .catch((err: any) => console.log(err));

// Init passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport)

app.use("/api/users", users)
app.use("/api/profile", profile)
app.use("/api/posts", posts)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
