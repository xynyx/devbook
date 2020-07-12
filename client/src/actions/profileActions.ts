import axios from "axios";
import { SET_PROFILE, PROFILE_LOADING, SET_ERRORS, CLEAR_CURRENT_PROFILE } from "./types";

export const getCurrentProfile = () => (dispatch: any) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: SET_PROFILE,
        payload: res.data,
      });
    })
    // If there is no profile, set profile to empty object
    .catch(() => {
      dispatch({
        type: SET_PROFILE,
        payload: {},
      });
    });
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export const clearProfileOnLogout = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
