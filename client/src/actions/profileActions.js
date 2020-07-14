"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearProfileOnLogout = exports.setProfileLoading = exports.createProfile = exports.getCurrentProfile = void 0;
var axios_1 = __importDefault(require("axios"));
var types_1 = require("./types");
// Get Profile
exports.getCurrentProfile = function () { return function (dispatch) {
    // dispatch(setProfileLoading());
    axios_1.default
        .get("/api/profile")
        .then(function (res) {
        console.log("RES?/* ? */");
        dispatch({
            type: types_1.SET_PROFILE,
            payload: res.data,
        });
    })
        // If there is no profile, set profile to empty object
        .catch(function () {
        console.log("CATCH");
        dispatch({
            type: types_1.SET_PROFILE,
            payload: {},
        });
    });
}; };
// Create Profile
// export const createProfile = (profile: any, history: any) => async (
//   dispatch: any
// ) => {
//   console.log("here2");
//   const response = await axios.post("/api/profile", profile);
//   console.log("response", response);
//   })
//   if (response.status === 200) {
//     console.log("success");
//     return history.push("/dashboard");
//   } else {
//     // dispatch({
//     //   type: SET_ERRORS,
//     //   payload: response.response.data,
//     // });
//   }
//   // const profileData = await response.json();
// };
exports.createProfile = function (profile, history) { return function (dispatch) {
    console.log("here");
    axios_1.default
        .post("/api/profile", profile)
        .then(function (res) {
        console.log('res', res);
        history.push("/dashboard");
    })
        .catch(function (err) {
        console.log("err", err);
        dispatch({
            type: types_1.SET_ERRORS,
            payload: err.response.data,
        });
    });
}; };
exports.setProfileLoading = function () {
    return {
        type: types_1.PROFILE_LOADING,
    };
};
exports.clearProfileOnLogout = function () {
    return {
        type: types_1.CLEAR_CURRENT_PROFILE,
    };
};
