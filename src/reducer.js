import {reduxActionTypes} from './consts';

const {
  SET_FILTER_CATEGORY,
  GET_FILTERED_MOVIES,
  GET_GENRES_LIST,
  REQUIRED_AUTHORIZATION,
  LOAD_MOVIES,
} = reduxActionTypes;

const initialState = {
  category: null,
  movies: [],
  genres: [],
  filteredMovies: [],
  isAuthorizationRequired: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_CATEGORY:
      return Object.assign({}, state, {
        category: action.payload,
      });

    case GET_FILTERED_MOVIES:
      return Object.assign({}, state, {
        filteredMovies: getFilteredMovies(state.category, state.movies)
      });

    case GET_GENRES_LIST:
      return Object.assign({}, state, {
        genres: getGenresList(state.movies)
      });

    case REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });

    case LOAD_MOVIES:
      return Object.assign({}, state, {
        movies: action.payload,
      });
  }

  return state;
};

function getGenresList(movies) {
  const genres = new Set().add(null);
  movies.forEach((movie) =>
    genres.add(movie.genre)
  );
  return Array.from(genres);
}

function getFilteredMovies(category, movies) {
  return category
    ? movies.filter((it) => it.genre === category)
    : movies;
}
