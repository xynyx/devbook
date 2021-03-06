"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var setAuthToken_1 = __importDefault(require("../helpers/setAuthToken"));
var types_1 = require("./types");
var jwt_decode_1 = __importDefault(require("jwt-decode"));
// CLOSURE
/* This is the same as:
function registerUser(userData, history) {
  return function (dispatch) {}
}
*/
exports.registerUser = function (userData, history) { return function (dispatch) {
    console.log("userData", userData);
    axios_1.default
        .post("/api/users/register", userData)
        .then(function (res) {
        console.log("res", res.data);
        var token = res.data.token;
        localStorage.setItem("jwtToken", token);
        // Set token to Authorization header to allow user access to protected routes
        setAuthToken_1.default(token);
        var decoded = jwt_decode_1.default(token);
        dispatch(exports.setCurrentUser(decoded));
        history.push("/dashboard");
    })
        // err.response.data to actually get the object of errors
        .catch(function (err) {
        console.log("err", err);
        dispatch({ type: types_1.SET_ERRORS, payload: err.response.data });
    });
}; };
exports.loginUser = function (userData, history) { return function (dispatch) {
    axios_1.default
        .post("/api/users/login", userData)
        .then(function (res) {
        console.log("res.data", res.data);
        // Save JWT to localStorage
        //! NOT DRY
        var token = res.data.token;
        localStorage.setItem("jwtToken", token);
        // Set token to Authorization header to allow user access to protected routes
        setAuthToken_1.default(token);
        var decoded = jwt_decode_1.default(token);
        dispatch(exports.setCurrentUser(decoded));
        history.push("/dashboard");
    })
        .catch(function (err) {
        dispatch({ type: types_1.SET_ERRORS, payload: err.response.data });
    });
}; };
// Set Logged In User
exports.setCurrentUser = function (decoded) {
    return {
        type: types_1.SET_USER,
        payload: decoded,
    };
};
// Log Out User
exports.logoutUser = function () { return function (dispatch) {
    // Remove JWT token
    try {
        console.log("here");
        localStorage.removeItem("jwtToken");
        // Delete Authorization header with the token
        setAuthToken_1.default(false);
        // Set {} for user => isAuthorized set to false (see AuthReducer)
        dispatch(exports.setCurrentUser({}));
    }
    catch (_a) {
        console.log("Logout Failed");
    }
}; };
