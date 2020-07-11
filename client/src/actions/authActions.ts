import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";
import { LoginInfo } from "../types";
import { SET_ERRORS, SET_USER } from "./types";
import jwt_decode from "jwt-decode";
// CLOSURE
/* This is the same as:
function registerUser(userData, history) {
  return function (dispatch) {}
} 
*/
// Allows thunk middleware to dispatch
export const registerUser = (userData: LoginInfo, history: any) => (
  dispatch: any
) => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    // err.response.data to actually get the object of errors
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const loginUser = (userData: LoginInfo) => (dispatch: any) => {
  console.log("HERE");
  axios.post("/api/users/login", userData).then(res => {
    console.log("res", res);
    // Save JWT to localStorage
    const { token } = res.data;
    console.log("token", token);
    localStorage.setItem("jwtToken", token);
    // Set token to Authorization header to allow user access to protected routes
    setAuthToken(token);
    const decoded = jwt_decode(token);
    console.log("test", decoded);
    dispatch(setCurrentUser(decoded));
  })
  .catch(err => {
    console.log('err.response', err.response)
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  });
};

// Set Logged In User
export const setCurrentUser = (decoded: any) => {
  return {
    type: SET_USER,
    payload: decoded,
  };
};
