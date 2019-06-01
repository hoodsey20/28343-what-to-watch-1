import actionTypes from './actionTypes';

const {
  SET_FILTER_CATEGORY,
  LOAD_MOVIES,
} = actionTypes;

export const ActionCreator = {
  loadMovies: (data) => ({
    type: LOAD_MOVIES,
    payload: data,
  }),

  setFilter: (categoryName) => ({
    type: SET_FILTER_CATEGORY,
    payload: categoryName,
  }),
};

export const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
      });
  },
};
