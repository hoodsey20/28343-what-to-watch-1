import {createSelector} from 'reselect';
import changeCaseObject from 'change-case-object';

import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.MOVIES;

const moviesSelector = (state) => moviesAdapter(state[NAME_SPACE].movies);
export const categorySelector = (state) => state[NAME_SPACE].category;

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

function moviesAdapter(movies) {
  return movies.map((item) => changeCaseObject.camelCase(item))
}