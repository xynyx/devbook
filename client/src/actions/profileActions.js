"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var types_1 = require("./types");
exports.getCurrentProfile = function () { return function (dispatch) {
    dispatch(exports.setProfileLoading());
    axios_1.default
        .get("/api/profile")
        .then(function (res) {
        dispatch({
            type: types_1.SET_PROFILE,
            payload: res.data,
        });
    })
        // If there is no profile, set profile to empty object
        .catch(function () {
        dispatch({
            type: types_1.SET_PROFILE,
            payload: {},
        });
    });
}; };
exports.setProfileLoading = function () {
    return {
        type: types_1.PROFILE_LOADING,
    };
};
