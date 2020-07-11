import { SET_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action: any) {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: action.payload ? true : false,
        user: action.payload,
      };
    default:
      return state;
  }
}
