import ActionTypes from './action-types';

const {
  SET_FILTER_CATEGORY,
  LOAD_MOVIES,
} = ActionTypes;

const initialState = {
  category: null,
  movies: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_CATEGORY:
      return Object.assign({}, state, {
        category: action.payload,
      });

    case LOAD_MOVIES:
      return Object.assign({}, state, {
        movies: action.payload,
      });
  }

  return state;
};
