import { SET_ERRORS } from "../actions/types";

export default function (state = {}, action: any) {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
