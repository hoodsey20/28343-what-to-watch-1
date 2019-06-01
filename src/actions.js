import {reduxActionTypes} from './consts';

const {
  SET_FILTER_CATEGORY,
  GET_FILTERED_MOVIES,
  GET_GENRES_LIST,
  REQUIRED_AUTHORIZATION,
  LOAD_MOVIES,
} = reduxActionTypes;

export const ActionCreator = {
  loadMovies: (data) => ({
    type: LOAD_MOVIES,
    payload: data,
  }),

  setFilter: (categoryName) => ({
    type: SET_FILTER_CATEGORY,
    payload: categoryName,
  }),

  getFilteredMovies: () => ({
    type: GET_FILTERED_MOVIES
  }),

  getGenresList: () => ({
    type: GET_GENRES_LIST
  }),

  requireAuthorization: (status) => ({
    type: REQUIRED_AUTHORIZATION,
    payload: status,
  }),
};

export const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
        dispatch(ActionCreator.getFilteredMovies());
        dispatch(ActionCreator.getGenresList());
      });
  },
};
