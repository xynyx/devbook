"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var auth_1 = __importDefault(require("./auth"));
var errors_1 = __importDefault(require("./errors"));
var profile_1 = __importDefault(require("./profile"));
exports.default = redux_1.combineReducers({
    auth: auth_1.default,
    errors: errors_1.default,
    profile: profile_1.default
});
