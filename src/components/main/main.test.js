import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main.jsx';

const mock = [`first`, `second`, `third`];

it(`Main is rendered correctly`, () => {
  const tree = renderer.create(<Main
    movies={mock}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
