import React from 'react';
import renderer from 'react-test-renderer';

import {UserBlock} from './user-block.jsx';

const userMock = {"id": 1, "email": `artem.n@cupcakedev.com`, "name": `artem.n`, "avatarUrl": `/wtw/static/avatar/9.jpg`};

it(`UserBlock is rendered correctly`, () => {
  const tree = renderer.create(<UserBlock
    history={{push: jest.fn()}}
    user={userMock}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
