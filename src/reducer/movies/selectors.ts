import { createSelector } from "reselect";
import * as camelcaseKeys from "camelcase-keys";
import { AppState } from "../reducer";
import { Review, Movie } from "./types";

import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.MOVIES;
const MAX_GENRES = 9;
const MAX_SIMILAR_MOVIES = 4;

export const promoSelector = (state: AppState) => {
  const data = state[NAME_SPACE].promo;
  if (data) {
    return camelcaseKeys(data);
  }
  return data;
};
const moviesSelector = (state: AppState) =>
  moviesAdapter(state[NAME_SPACE].movies);
const moviesReviews = (state: AppState): Review[] => state[NAME_SPACE].reviews;
export const categorySelector = (state: AppState): string =>
  state[NAME_SPACE].category;
const idSelector = (state: AppState, id: number): number => id;
export const addReviewErrorSelector = (state: AppState) =>
  state[NAME_SPACE].addReviewError;

export const genresSelector = createSelector(
  moviesSelector,
  movies => {
    const genres = new Set().add(null);
    movies.forEach((movie: Movie) => genres.add(movie.genre));
    return Array.from(genres).slice(0, MAX_GENRES);
  }
);

export const favoritesSelector = createSelector(
  moviesSelector,
  movies => movies.filter(it => it.isFavorite)
);

export const filteredMoviesSelector = createSelector(
  moviesSelector,
  categorySelector,
  (movies, category) =>
    category ? movies.filter(it => it.genre === category) : movies
);

export const movieByIdSelector = createSelector(
  idSelector,
  moviesSelector,
  (id, movies) => {
    const filtered = movies.filter(it => it.id === id);
    return filtered[0] ? filtered[0] : null;
  }
);

export const similarMoviesSelector = createSelector(
  moviesSelector,
  movieByIdSelector,
  (movies, movie) => {
    if (!movie) {
      return [];
    }
    return movies
      .filter(it => it.genre === movie.genre && it.id !== movie.id)
      .slice(0, MAX_SIMILAR_MOVIES);
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
  return movies.map(item => camelcaseKeys(item));
}
