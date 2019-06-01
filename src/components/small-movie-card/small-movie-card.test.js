import React from 'react';
import renderer from 'react-test-renderer';

import {SmallMoovieCard} from './small-movie-card.jsx';

const mockMovie = {
  id: 1,
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  preview_image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  src: [
    `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  ]
};

it(`SmallMoovieCard card is rendered correctly`, () => {

  const tree = renderer.create(<SmallMoovieCard
    movie={mockMovie}
    onClick={jest.fn()}
    isPlaying={false}
    renderVideo={() => <div />}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
