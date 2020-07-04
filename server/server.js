const express = require("express");
const mongoose = require("mongoose");

const app = express();

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
