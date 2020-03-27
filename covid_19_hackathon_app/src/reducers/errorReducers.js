import { GET_ERRORS } from "../actions/authActionTypes";

const initialState = {};

// reducer that checks for errors. If it is an error, it returns payload.

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
