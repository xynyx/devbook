import axios from "axios";
import { TEST_DISPATCH } from "./types";

// CLOSURE
/* This is the same as:
function registerUser(userData) {
  return function (dispatch) {}
} 
*/
export const registerUser = userData => dispatch => {
  // return {
  //   type: TEST_DISPATCH,
  //   payload: userData,
  // };
  axios
    .post("/api/users/register", userData)
    .then(res => {
      // console.log("res.data :>> ", res.data);

    })
    // err.response.data to actually get the object of errors
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
