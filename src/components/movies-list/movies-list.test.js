import React from 'react';
import renderer from 'react-test-renderer';

import {MoviesList} from './movies-list.jsx';

const mock = [
  {
    id: 1,
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    cover: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    src: [`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`]
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    cover: `img/bohemian-rhapsody.jpg`,
    src: [`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`]
  },
];

it(`MoviesList is rendered correctly`, () => {
  const tree = renderer.create(<MoviesList
    movies={mock}
    onClick={jest.fn()}
    cardHoverHandler={jest.fn()}
    cardLeaveHandler={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
