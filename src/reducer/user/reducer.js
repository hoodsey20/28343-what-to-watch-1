import actionTypes from './actionTypes';

const {
  REQUIRED_AUTHORIZATION
} = actionTypes;

const initialState = {
  isAuthorizationRequired: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
  }

  return state;
};
