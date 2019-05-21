import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';

const mock = [
  {
    id: 1,
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    cover: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genres: [`Kids & Family`],
    src: [
      `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
    ]
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    cover: `img/bohemian-rhapsody.jpg`,
    genres: [`Kids & Family`],
    src: [
      `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
    ]
  },
];

it(`App is rendered correctly`, () => {
  function createNodeMock() {
    return {};
  }
  const tree = renderer.create(<App
    movies={mock}
    filteredMovies={mock}
    category={null}
    handleGenreFilter={jest.fn()}
  />, {createNodeMock}).toJSON();

  expect(tree).toMatchSnapshot();
});
