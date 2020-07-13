import axios from "axios";
import {
  SET_PROFILE,
  PROFILE_LOADING,
  SET_ERRORS,
  CLEAR_CURRENT_PROFILE,
} from "./types";

// Get Profile
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

export const createProfile = (profile: any, history: any) => (
  dispatch: any
) => {
  console.log("here")
  axios
    .post("/api/profile", profile)
    .then((res: any) => {
      console.log('res', res)
      history.push("/dashboard");
    })
    .catch((err: any) => {
      console.log("err", err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
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
