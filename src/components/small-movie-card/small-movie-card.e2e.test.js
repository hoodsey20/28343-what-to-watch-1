import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {SmallMoovieCard} from './small-movie-card.jsx';

configure({adapter: new Adapter()});

const mock = {
  id: 1,
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  cover: ``,
  src: [`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`]
};

it(`SmallMoovieCard mouseEnter calls callback`, () => {
  const hoverHandler = jest.fn();

  const app = shallow(<SmallMoovieCard
    movie={mock}
    isPlaying={false}
    hoverHandler={hoverHandler}
    renderVideo={() => <div />}
  />);

  const card = app.find(`.small-movie-card`);
  card.simulate(`mouseEnter`);
  expect(hoverHandler).toHaveBeenCalledTimes(1);
});
