import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';

const mock = [`first`, `second`, `third`];

it(`App is rendered correctly`, () => {
  const tree = renderer.create(<App
    movies={mock}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
