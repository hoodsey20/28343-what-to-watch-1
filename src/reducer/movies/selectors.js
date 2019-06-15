import {createSelector} from 'reselect';
import camelcaseKeys from 'camelcase-keys';

import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.MOVIES;

const moviesSelector = (state) => moviesAdapter(state[NAME_SPACE].movies);
const moviesReviews = (state) => state[NAME_SPACE].reviews;
export const categorySelector = (state) => state[NAME_SPACE].category;
const idSelector = (state, id) => id;

export const genresSelector = createSelector(
    moviesSelector,
    (movies) => {
      const genres = new Set().add(null);
      movies.forEach((movie) =>
        genres.add(movie.genre)
      );
      return Array.from(genres);
    }
);

export const filteredMoviesSelector = createSelector(
    moviesSelector,
    categorySelector,
    (movies, category) => category
      ? movies.filter((it) => it.genre === category)
      : movies
);

export const movieByIdSelector = createSelector(
    idSelector,
    moviesSelector,
    (id, movies) => {
      const filtered = movies.filter((it) => it.id === id);
      return filtered[0] ? filtered[0] : null;
    }
);

export const reviewByIdSelector = createSelector(
    idSelector,
    moviesReviews,
    (id, reviews) => {
      const filtered = reviews[id];
      return filtered ? filtered : null;
    }
);

function moviesAdapter(movies) {
  return movies.map((item) => camelcaseKeys(item));
}
