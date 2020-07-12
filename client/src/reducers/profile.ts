import { SET_PROFILE, PROFILE_LOADING } from "./types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
