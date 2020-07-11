"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var setAuthToken_1 = __importDefault(require("../helpers/setAuthToken"));
var types_1 = require("./types");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// CLOSURE
/* This is the same as:
function registerUser(userData, history) {
  return function (dispatch) {}
}
*/
// Allows thunk middleware to dispatch
exports.registerUser = function (userData, history) { return function (dispatch) {
    axios_1.default
        .post("/api/users/register", userData)
        .then(function (res) { return history.push("/login"); })
        // err.response.data to actually get the object of errors
        .catch(function (err) {
        dispatch({ type: types_1.SET_ERRORS, payload: err.response.data });
    });
}; };
exports.loginUser = function (userData, history) { return function (dispatch) {
    axios_1.default
        .post("/api/users/login", userData)
        .then(function (res) {
        // Save JWT to localStorage
        var token = res.data.token;
        localStorage.setItem("jwtToken", token);
        // Set token to Authorization header to allow user access to protected routes
        setAuthToken_1.default(token);
        var decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        console.log('test', decoded);
        dispatch(exports.setCurrentUser(decoded));
    })
        .catch(function (err) {
        dispatch({ type: types_1.SET_ERRORS, payload: err.response.data });
    });
}; };
// Set Logged In User
exports.setCurrentUser = function (decoded) {
    return {
        type: types_1.SET_USER,
        payload: decoded
    };
};