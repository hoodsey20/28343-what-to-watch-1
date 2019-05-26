import {reduxActionTypes} from './consts';

const {
  SET_FILTER_CATEGORY,
  GET_FILTERED_MOVIES,
  GET_GENRES_LIST,
} = reduxActionTypes;

export const ActionCreator = {
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
};
