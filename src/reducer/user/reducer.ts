import { ActionTypes, UserState, UserActionTypes } from "./types";

const { SET_USER_DATA, SET_USER_ERROR } = ActionTypes;

const initialState: UserState = {
  error: null,
  user: null
};

export const reducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, {
        user: action.payload
      });
    case SET_USER_ERROR:
      return Object.assign({}, state, {
        error: action.payload
      });
  }

  return state;
};
