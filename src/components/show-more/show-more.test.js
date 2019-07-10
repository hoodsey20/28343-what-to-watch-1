import React from 'react';
import renderer from 'react-test-renderer';

import SmowMore from './show-more';

it(`SmowMore is rendered correctly`, () => {
  const tree = renderer.create(<SmowMore
    isVisible
    clickHandler={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
