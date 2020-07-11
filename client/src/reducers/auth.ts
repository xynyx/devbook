import { SET_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: action.payload.user ? true : false,
        user: action.payload,
      };
    default:
      return state;
  }
}
