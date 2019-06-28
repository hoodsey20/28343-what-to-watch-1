import ActionTypes from './action-types';
import {reducer} from './reducer';

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

describe(`Movies reducer works correctly`, () => {
  it(`Category`, function () {
    const categories = [null, `Drama`, `Action`, `Fantasy`, `Comedy`, `Crime`, `Adventure`, `Thriller`];
    let nextState = reducer(initialState, {type: SET_FILTER_CATEGORY, payload: categories[1]});
    expect(nextState.category).toBe(categories[1]);

    nextState = reducer(initialState, {type: SET_FILTER_CATEGORY, payload: categories[2]});
    expect(nextState.category).toBe(categories[2]);
  });

  it(`movies`, function () {
    const movies = [
      {"name": `Orlando`, "poster_image": `https://es31-server.appspot.com/wtw/static/film/poster/Orlando.jpg`},
      {"name": `The Revenant`, "poster_image": `https://es31-server.appspot.com/wtw/static/film/poster/Revenant.jpg`}
    ];
    let nextState = reducer(initialState, {type: LOAD_MOVIES, payload: movies});
    expect(nextState.movies).toBe(movies);
  });

  it(`reviews`, function () {
    const newReviews = [{"id": 1, "user": {"id": 12, "name": `Isaac`}, "rating": 4, "comment": `Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.`, "date": `2019-06-22T11:52:42.142Z`}, {"id": 2, "user": {"id": 12, "name": `Isaac`}, "rating": 4, "comment": `Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.`, "date": `2019-06-22T11:52:42.142Z`}];

    let payload = {
      data: newReviews,
      movieId: 99,
    };
    const nextState = reducer(initialState, {type: LOAD_REVIEWS, payload});
    expect(nextState.reviews).toStrictEqual({
      99: newReviews,
    });
  });

  it(`add review`, function () {
    const newReviews = [{"id": 1, "user": {"id": 12, "name": `Isaac`}, "rating": 4, "comment": `Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.`, "date": `2019-06-22T11:52:42.142Z`}];

    let payload = {
      data: newReviews,
      movieId: 100,
    };
    const nextState2 = reducer(initialState, {type: ADD_REVIEW, payload});
    expect(nextState2.reviews).toStrictEqual({
      100: newReviews,
    });
  });

  it(`review error`, function () {
    const reviewError = `Error`;

    let nextState = reducer(initialState, {type: ADD_REVIEW_ERROR, payload: reviewError});
    expect(nextState.addReviewError).toBe(reviewError);
  });

  it(`promo`, function () {
    const promo = {"name": `Orlando`, "poster_image": `https://es31-server.appspot.com/wtw/static/film/poster/Orlando.jpg`};

    let nextState = reducer(initialState, {type: LOAD_PROMO, payload: promo});
    expect(nextState.promo).toBe(promo);
  });

  it(`favorite status`, function () {
    const favoriteInitialState = {
      promo: {"id": 1, "name": `Orlando`, "poster_image": `https://es31-server.appspot.com/wtw/static/film/poster/Orlando.jpg`},
      movies: [
        {"id": 1, "name": `Orlando`, "poster_image": `https://es31-server.appspot.com/wtw/static/film/poster/Orlando.jpg`},
        {"id": 2, "name": `The Revenant`, "poster_image": `https://es31-server.appspot.com/wtw/static/film/poster/Revenant.jpg`}
      ]
    };

    const updatedData = Object.assign({}, favoriteInitialState.promo, {isFavorite: 1});
    const payload = {
      data: updatedData,
      movieId: updatedData.id,
    };

    let nextState = reducer(favoriteInitialState, {type: SET_FAVORITE_STATUS, payload});
    expect(nextState.promo).toStrictEqual(updatedData);
    expect(nextState.movies[0]).toStrictEqual(updatedData);
  });

});
