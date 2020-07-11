import axios from "axios";
import { SET_ERRORS } from "./types";

// CLOSURE
/* This is the same as:
function registerUser(userData, history) {
  return function (dispatch) {}
} 
*/
export const registerUser = (userData, history) => dispatch => {
  // return {
  //   type: TEST_DISPATCH,
  //   payload: userData,
  // };
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    // err.response.data to actually get the object of errors
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
