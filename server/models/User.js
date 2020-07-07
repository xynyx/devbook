"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
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
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.User = mongoose.model("users", UserSchema);
//# sourceMappingURL=User.js.map