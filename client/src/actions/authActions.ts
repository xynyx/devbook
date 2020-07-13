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
export const registerUser = (userData: LoginInfo, history: any) => (
  dispatch: any
) => {
  console.log("userData", userData);
  axios
    .post("/api/users/register", userData)
    .then(res => {
      console.log('res', res.data)
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);

      // Set token to Authorization header to allow user access to protected routes
      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));

      history.push("/dashboard");
    })
    // err.response.data to actually get the object of errors
    .catch(err => {
      console.log("err", err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const loginUser = (userData: LoginInfo, history: any) => (
  dispatch: any
) => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      console.log('res.data', res.data)
      // Save JWT to localStorage
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);

      // Set token to Authorization header to allow user access to protected routes
      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));

      history.push("/dashboard");
    })
    .catch(err => {
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

// Log Out User
export const logoutUser = () => (dispatch: any) => {
  // Remove JWT token
  try {
    console.log("here");
    localStorage.removeItem("jwtToken");
    // Delete Authorization header with the token
    setAuthToken(false);
    // Set {} for user => isAuthorized set to false (see AuthReducer)
    dispatch(setCurrentUser({}));
  } catch {
    console.log("Logout Failed");
  }
};
