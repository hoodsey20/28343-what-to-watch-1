import ActionTypes from './action-types';

const {
  SET_FILTER_CATEGORY,
  LOAD_MOVIES,
  LOAD_REVIEWS,
  LOAD_PROMO,
  ADD_REVIEW,
  ADD_REVIEW_ERROR,
  SET_FAVORITE_STATUS,
} = ActionTypes;

const initialState = {
  category: null,
  movies: [],
  promo: null,
  reviews: {},
  addReviewError: null,
};

function updateReviews(reviews, newData, id) {
  if (newData.length) {
    reviews[id] = newData;
  }
  return Object.assign({}, reviews);
}

function updateFavoriteStatus(movies, newData, id) {
  let index;
  movies.forEach((it, i) => {
    if (it.id === Number(id)) {
      index = i;
    }
  });

  if (typeof index === `number`) {
    movies[index] = newData;
  }

  return movies;
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_CATEGORY:
      return Object.assign({}, state, {
        category: action.payload,
      });

    case LOAD_MOVIES:
      return Object.assign({}, state, {
        movies: action.payload,
      });

    case LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: updateReviews(state.reviews, action.payload.data, action.payload.movieId),
      });

    case LOAD_PROMO:
      return Object.assign({}, state, {
        promo: action.payload,
      });

    case ADD_REVIEW:
      return Object.assign({}, state, {
        reviews: updateReviews(state.reviews, action.payload.data, action.payload.movieId),
      });

    case ADD_REVIEW_ERROR:
      return Object.assign({}, state, {
        addReviewError: action.payload,
      });

    case SET_FAVORITE_STATUS:
      return Object.assign({}, state, {
        movies: updateFavoriteStatus(state.movies, action.payload.data, action.payload.movieId)
      });
  }

  return state;
};
