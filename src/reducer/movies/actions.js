import ActionTypes from './action-types';

const {
  SET_FILTER_CATEGORY,
  LOAD_MOVIES,
  LOAD_REVIEWS,
  LOAD_PROMO,
  ADD_REVIEW,
  ADD_REVIEW_ERROR,
  SET_FAVORITE_STATUS,
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

  loadPromo: (data) => ({
    type: LOAD_PROMO,
    payload: data,
  }),

  setAddReviewError: (data) => ({
    type: ADD_REVIEW_ERROR,
    payload: data,
  }),

  addReview: (movieId, data) => ({
    type: ADD_REVIEW,
    payload: {movieId, data},
  }),

  setFavoriteStatus: (movieId, data) => ({
    type: SET_FAVORITE_STATUS,
    payload: {movieId, data}
  }),
};

export const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
      });
  },
  loadPromo: () => (dispatch, _getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromo(response.data));
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
  sendReview: (movieId, data) => (dispatch, _getState, api) => {
    ActionCreator.setAddReviewError(null);
    return api.post(`/comments/${movieId}`, data)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.addReview(
              movieId,
              response.data
          ));
        } else {
          dispatch(ActionCreator.setAddReviewError(
              response
                ? response
                : `Unexpected error`
          ));
        }
      });
  },
  sendNewFavoriteStatus: (movieId, currentStatus) => (dispatch, _getState, api) => {
    const status = currentStatus ? 0 : 1;
    return api.post(`/favorite/${movieId}/${status}`)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.setFavoriteStatus(
              movieId,
              response.data
          ));
        }
      });
  }
};
