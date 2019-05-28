import films from './mocks/films';
import {reduxActionTypes} from './consts';

const {
  SET_FILTER_CATEGORY,
  GET_FILTERED_MOVIES,
  GET_GENRES_LIST,
} = reduxActionTypes;

const initialState = {
  category: null,
  movies: films,
  genres: getGenresList(films),
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

    case GET_GENRES_LIST:
      return Object.assign({}, state, {
        genres: getGenresList(state.movies)
      });
  }

  return state;
};

function getGenresList(movies) {
  const genres = new Set().add(null);
  movies.forEach((movie) => {
    movie.genres.forEach((genre) => genres.add(genre));
  });
  return Array.from(genres);
}
