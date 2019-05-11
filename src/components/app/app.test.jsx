import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';

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

it(`App is rendered correctly`, () => {
  const tree = renderer.create(<App
    movies={mock}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
