import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main.jsx';

const mockMovies = [
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

const mockGenres = [null, `Kids & Family`, `Dramas`, `Thrillers`, `Comedies`, `Crime`];

it(`Main is rendered correctly`, () => {
  const tree = renderer.create(<Main
    movies={mockMovies}
    genres={mockGenres}
    handleGenreFilter={jest.fn()}

  />).toJSON();

  expect(tree).toMatchSnapshot();
});
