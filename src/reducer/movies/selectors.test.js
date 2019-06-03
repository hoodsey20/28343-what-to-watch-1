import NameSpace from '../name-spaces';
import {genresSelector, filteredMoviesSelector} from './selectors';

const NAME_SPACE = NameSpace.MOVIES;

const mockMovies = [
  {
    id: 1,
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `Kids & Family`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    genre: `Dramas`,
  },
  {
    id: 3,
    name: `Macbeth`,
    genre: `Dramas`,
  },
  {
    id: 4,
    name: `Aviator`,
    genre: `Dramas`,
  },
  {
    id: 5,
    name: `We need to talk about Kevin`,
    genre: `Thrillers`,
  },
  {
    id: 6,
    name: `Snatch`,
    genre: `Comedies`,
  },
];

const mockState = {};
mockState[NAME_SPACE] = {};
mockState[NAME_SPACE].movies = mockMovies;

it(`Selector correctly get list of genres`, () => {
  expect(
      genresSelector(mockState)
  ).toStrictEqual([
    null,
    `Kids & Family`,
    `Dramas`,
    `Thrillers`,
    `Comedies`,
  ]);
});

it(`Selector correctly filters by category`, () => {

  filteredMoviesSelector(
      createStateWithCategory(`Comedies`)
  ).forEach((movie) => {
    expect(movie.genre).toEqual(`Comedies`);
  });

  filteredMoviesSelector(
      createStateWithCategory(`Dramas`)
  ).forEach((movie) => {
    expect(movie.genre).toEqual(`Dramas`);
  });

  expect(
      filteredMoviesSelector(
          createStateWithCategory(null)
      )
  ).toBe(mockMovies);

  expect(
      filteredMoviesSelector(
          createStateWithCategory(`unexpected`)
      ).length
  ).toBe(0);
});

function createStateWithCategory(categoryName) {
  const newStateMock = {};
  newStateMock[NAME_SPACE] = {};
  newStateMock[NAME_SPACE].movies = mockMovies;
  newStateMock[NAME_SPACE].category = categoryName;
  return newStateMock;
}
