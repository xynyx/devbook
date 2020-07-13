import { SET_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action: any) {
  console.log("action.paylozsad", action.payload);
  console.log('state', state)
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated:
          Object.keys(action.payload).length > 0 ? true : false,
        user: action.payload,
      };
    default:
      return state;
  }
}
