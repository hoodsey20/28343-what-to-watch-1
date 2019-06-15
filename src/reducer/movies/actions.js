import ActionTypes from './action-types';

const {
  SET_FILTER_CATEGORY,
  LOAD_MOVIES,
  LOAD_REVIEWS,
} = ActionTypes;

export const ActionCreator = {
  loadMovies: (data) => ({
    type: LOAD_MOVIES,
    payload: data,
  }),

  setFilter: (categoryName) => ({
    type: SET_FILTER_CATEGORY,
    payload: categoryName,
  }),

  loadReviews: (movieId, data) => ({
    type: LOAD_REVIEWS,
    payload: {movieId, data},
  }),
};

export const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
      });
  },
  loadReviews: (movieId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(
          movieId,
          response.data
        ));
      });
  },
};
