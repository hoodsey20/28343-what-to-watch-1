import ActionTypes from './action-types';

const {
  SET_USER_DATA,
  SET_USER_ERROR,
} = ActionTypes;

const initialState = {
  error: null,
  user: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case SET_USER_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
      });
  }

  return state;
};
