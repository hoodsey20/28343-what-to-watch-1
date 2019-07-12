export const ActionTypes = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO: `LOAD_PROMO`,
  SET_FILTER_CATEGORY: `SET_FILTER_CATEGORY`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  ADD_REVIEW: `ADD_REVIEW`,
  ADD_REVIEW_ERROR: `ADD_REVIEW_ERROR`,
  SET_FAVORITE_STATUS: `SET_FAVORITE_STATUS`
};

export interface Movie {
  id: number;
  name: string;
  released: number;
  genre: string;
  backgroundImage: string;
  posterImage: string;
  director: string;
  isFavorite: boolean;
  runTime: number;
  starring: string[];
  rating: number;
  scoresCount: number;
  description: string;
  backgroundColor: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
}

export interface Review {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
}

interface ReviewData {
  [key: number]: Review[];
}

export interface MoviesState {
  category: null | string;
  movies: Movie[];
  promo: null | Movie;
  reviews: ReviewData;
  addReviewError: null | string;
}

type LoadMovies = {
  type: typeof ActionTypes.LOAD_MOVIES;
  payload: Movie[];
};

type SetFilter = {
  type: typeof ActionTypes.SET_FILTER_CATEGORY;
  payload: string;
};

type LoadReviews = {
  type: typeof ActionTypes.LOAD_REVIEWS;
  payload: {
    movieId: number;
    data: Review[];
  };
};

type LoadPromo = {
  type: typeof ActionTypes.LOAD_PROMO;
  payload: Movie;
};

type SetAddReviewError = {
  type: typeof ActionTypes.ADD_REVIEW_ERROR;
  payload: MoviesState["addReviewError"];
};

type AddReview = {
  type: typeof ActionTypes.ADD_REVIEW;
  payload: {
    movieId: Movie["id"];
    data: Review;
  };
};

type SetFavoriteStatus = {
  type: typeof ActionTypes.ADD_REVIEW;
  payload: {
    movieId: Movie["id"];
    data: boolean;
  };
};

export type MoviesActionTypes =
  | LoadMovies
  | SetFilter
  | LoadReviews
  | LoadPromo
  | SetAddReviewError
  | AddReview
  | SetFavoriteStatus;

export interface MoviesState {
  category: null | string;
  movies: Movie[];
  promo: null | Movie;
  reviews: ReviewData;
  addReviewError: null | string;
}
