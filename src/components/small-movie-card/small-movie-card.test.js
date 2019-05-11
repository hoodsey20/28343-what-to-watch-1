import React from 'react';
import renderer from 'react-test-renderer';

import SmallMoovieCard from './small-movie-card.jsx';

const mockMovie = {
  id: 1,
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  cover: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`SmallMoovieCard card is rendered correctly`, () => {
  const tree = renderer.create(<SmallMoovieCard
    movie={mockMovie}
    onClick={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
