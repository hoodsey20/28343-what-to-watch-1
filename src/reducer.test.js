import {reducer} from './reducer';
import {reduxActionTypes} from './consts';

const {
  SET_FILTER_CATEGORY,
  GET_FILTERED_MOVIES,
  GET_GENRES_LIST,
} = reduxActionTypes;

const mockMovies = [
  {
    id: 1,
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    cover: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genres: [`Kids & Family`],
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    cover: `img/bohemian-rhapsody.jpg`,
    genres: [`Dramas`],
  },
  {
    id: 3,
    name: `Macbeth`,
    cover: `img/macbeth.jpg`,
    genres: [`Dramas`],
  },
  {
    id: 4,
    name: `Aviator`,
    cover: `img/aviator.jpg`,
    genres: [`Dramas`],
  },
  {
    id: 5,
    name: `We need to talk about Kevin`,
    cover: `img/we-need-to-talk-about-kevin.jpg`,
    genres: [`Dramas`, `Thrillers`],
  },
  {
    id: 6,
    name: `Snatch`,
    cover: `img/snatch.jpg`,
    genres: [`Comedies`, `Crime`],
  },
];

const mockState = {
  category: null,
  movies: mockMovies,
  filteredMovies: mockMovies,
};

it(`Reducer without suitable action type returns initial state`, () => {
  expect(reducer(mockState, {type: `NOT_EXIST`})).toEqual(mockState);
});

it(`Reducer correctly sets filtering category`, () => {
  expect(
      reducer(mockState, {type: SET_FILTER_CATEGORY, payload: `Dramas`})
  ).toEqual({
    category: `Dramas`,
    movies: mockMovies,
    filteredMovies: mockMovies,
  });
});

it(`Reducer correctly filters by category`, () => {
  const crimeMovies = reducer(
      reducer(mockState, {type: SET_FILTER_CATEGORY, payload: `Crime`}),
      {type: GET_FILTERED_MOVIES}
  ).filteredMovies;

  crimeMovies.forEach((crimeMovie) => {
    expect(crimeMovie.genres).toEqual(expect.arrayContaining([`Crime`]));
  });

  const dramaMovies = reducer(
      reducer(mockState, {type: SET_FILTER_CATEGORY, payload: `Dramas`}),
      {type: GET_FILTERED_MOVIES}
  ).filteredMovies;

  dramaMovies.forEach((dramaMovie) => {
    expect(dramaMovie.genres).toEqual(expect.arrayContaining([`Dramas`]));
  });

  const allMovies = reducer(
      reducer(mockState, {type: SET_FILTER_CATEGORY, payload: null}),
      {type: GET_FILTERED_MOVIES}
  ).filteredMovies;

  expect(allMovies).toBe(mockState.filteredMovies);

  const noSuchGenreMovies = reducer(
      reducer(mockState, {type: SET_FILTER_CATEGORY, payload: `unexpected genre`}),
      {type: GET_FILTERED_MOVIES}
  ).filteredMovies;

  expect(noSuchGenreMovies.length).toBe(0);
});

it(`Reducer correctly get list of genres`, () => {
  const genres = reducer(mockState, {type: GET_GENRES_LIST}).genres;
  expect(
      genres
  ).toStrictEqual([
    null,
    `Kids & Family`,
    `Dramas`,
    `Thrillers`,
    `Comedies`,
    `Crime`,
  ]);
});
