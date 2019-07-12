import { User } from "../user/types";

export const ActionTypes = {
  LOAD_MOVIES: `LOAD_MOVIES` as const,
  LOAD_PROMO: `LOAD_PROMO` as const,
  SET_FILTER_CATEGORY: `SET_FILTER_CATEGORY` as const,
  LOAD_REVIEWS: `LOAD_REVIEWS` as const,
  ADD_REVIEW: `ADD_REVIEW` as const,
  ADD_REVIEW_ERROR: `ADD_REVIEW_ERROR` as const,
  SET_FAVORITE_STATUS: `SET_FAVORITE_STATUS` as const
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
    data: Review[];
  };
};

type SetFavoriteStatus = {
  type: typeof ActionTypes.SET_FAVORITE_STATUS;
  payload: {
    movieId: Movie["id"];
    data: Movie;
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
