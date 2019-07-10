import React from 'react';
import renderer from 'react-test-renderer';

import {GenresList} from './genres-list';

const mockGenres = [null, `Kids & Family`, `Dramas`, `Thrillers`, `Comedies`, `Crime`];

it(`GenresList is rendered correctly`, () => {
  const tree = renderer.create(<GenresList
    genres={mockGenres}
    category={mockGenres[0]}
    handleGenreFilter={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
