import React from 'react';
import renderer from 'react-test-renderer';

import {SignIn} from './sign-in';

it(`SignIn form is rendered correctly`, () => {
  const tree = renderer.create(<SignIn
    formSubmitHandler={jest.fn()}
    inputHandler={jest.fn()}
    makeAuth={jest.fn()}
    error={null}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
