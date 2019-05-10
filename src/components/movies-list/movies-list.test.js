import React from 'react';
import renderer from 'react-test-renderer';

import MoviesList from './movies-list.jsx';

const mock = [
  {
    id: 1,
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    cover: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    cover: `img/bohemian-rhapsody.jpg`,
  },
];

it(`MoviesList is rendered correctly`, () => {
  const tree = renderer.create(<MoviesList
    movies={mock}
    onClick={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
