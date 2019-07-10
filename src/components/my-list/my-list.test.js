import React from 'react';
import renderer from 'react-test-renderer';

import {MyList} from './my-list';

it(`MyList is rendered correctly`, () => {
  const tree = renderer.create(<MyList
    history={{push: jest.fn()}}
    user={null}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
