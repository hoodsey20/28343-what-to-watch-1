import films from './mocks/films';
import {reduxActionTypes} from './consts';

const {
  SET_FILTER_CATEGORY,
  GET_FILTERED_MOVIES,
} = reduxActionTypes;

const initialState = {
  category: null,
  movies: films,
  filteredMovies: films,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_CATEGORY:
      return Object.assign({}, state, {
        category: action.payload,
      });

    case GET_FILTERED_MOVIES:
      return Object.assign({}, state, {
        filteredMovies: state.category
          ? state.movies.filter((it) => it.genres.includes(state.category))
          : state.movies
      });
  }

  return state;
};
