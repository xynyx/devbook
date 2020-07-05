const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


export const User = mongoose.model("users", UserScheme)