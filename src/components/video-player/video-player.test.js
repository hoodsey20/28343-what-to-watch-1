import React from 'react';
import renderer from 'react-test-renderer';

import VideoPlayer from './video-player.jsx';

const mockData = {
  isPlaying: false,
  cover: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  src: [`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`]
};

it(`VideoPlayer is rendered correctly`, () => {
  const {isPlaying, cover, src} = mockData;

  const tree = renderer.create(<VideoPlayer
    isPlaying={isPlaying}
    cover={cover}
    src={src}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
