import { ActionTypes, Movie, Review, MoviesActionTypes } from "./types";

const {
  SET_FILTER_CATEGORY,
  LOAD_MOVIES,
  LOAD_REVIEWS,
  LOAD_PROMO,
  ADD_REVIEW,
  ADD_REVIEW_ERROR,
  SET_FAVORITE_STATUS
} = ActionTypes;

export const ActionCreator = {
  loadMovies: (data: Movie[]): MoviesActionTypes => ({
    type: LOAD_MOVIES,
    payload: data
  }),

  setFilter: (categoryName: string): MoviesActionTypes => ({
    type: SET_FILTER_CATEGORY,
    payload: categoryName
  }),

  loadReviews: (movieId: number, data: Review[]): MoviesActionTypes => ({
    type: LOAD_REVIEWS,
    payload: { movieId, data }
  }),

  loadPromo: (data: Movie): MoviesActionTypes => ({
    type: LOAD_PROMO,
    payload: data
  }),

  setAddReviewError: (data: string | null): MoviesActionTypes => ({
    type: ADD_REVIEW_ERROR,
    payload: data
  }),

  addReview: (movieId: Movie["id"], data: Review[]): MoviesActionTypes => ({
    type: ADD_REVIEW,
    payload: { movieId, data }
  }),

  setFavoriteStatus: (
    movieId: Movie["id"],
    data: Movie
  ): MoviesActionTypes => ({
    type: SET_FAVORITE_STATUS,
    payload: { movieId, data }
  })
};

export const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(`/films`).then(response => {
      dispatch(ActionCreator.loadMovies(response.data));
    });
  },
  loadPromo: () => (dispatch, _getState, api) => {
    return api.get(`/films/promo`).then(response => {
      dispatch(ActionCreator.loadPromo(response.data));
    });
  },
  loadReviews: movieId => (dispatch, _getState, api) => {
    return api.get(`/comments/${movieId}`).then(response => {
      dispatch(ActionCreator.loadReviews(movieId, response.data));
    });
  },
  sendReview: (movieId, data) => (dispatch, _getState, api) => {
    ActionCreator.setAddReviewError(null);
    return api.post(`/comments/${movieId}`, data).then(response => {
      if (response.data) {
        dispatch(ActionCreator.addReview(movieId, response.data));
      } else {
        dispatch(
          ActionCreator.setAddReviewError(
            response ? response : `Unexpected error`
          )
        );
      }
    });
  },
  sendNewFavoriteStatus: (movieId: number, currentStatus: boolean) => (
    dispatch,
    _getState,
    api
  ) => {
    const status = currentStatus ? 0 : 1;
    return api.post(`/favorite/${movieId}/${status}`).then(response => {
      if (response.data) {
        dispatch(ActionCreator.setFavoriteStatus(movieId, response.data));
      }
    });
  }
};
