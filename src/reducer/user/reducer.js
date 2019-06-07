import actionTypes from './actionTypes';

const {
  REQUIRED_AUTHORIZATION,
  SET_USER_DATA,
} = actionTypes;

const initialState = {
  isAuthorizationRequired: false,
  user: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });

    case SET_USER_DATA:
      return Object.assign({}, state, {
        user: action.payload,
      });
  }

  return state;
};