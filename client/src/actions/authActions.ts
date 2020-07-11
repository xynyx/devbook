import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";
import { LoginInfo } from "../types";
import { SET_ERRORS, SET_USER } from "./types";
import jwt from 'jsonwebtoken'

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

export const loginUser = (userData: LoginInfo, history: any) => (
  dispatch: any
) => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save JWT to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Authorization header to allow user access to protected routes
      setAuthToken(token);
      const decoded =  jwt.verify(token, process.env.SECRET)
      console.log('test', decoded)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

// Set Logged In User
export const setCurrentUser = (decoded: string) => {
  return {
    type: SET_USER,
    payload: decoded
  }
}
