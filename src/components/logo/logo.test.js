import React from 'react';
import renderer from 'react-test-renderer';

import {Logo} from './logo.jsx';

it(`Logo is rendered correctly`, () => {
  const tree = renderer.create(<Logo
    history={{push: jest.fn()}}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
