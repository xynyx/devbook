import { TEST_DISPATCH } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
};