import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SmallMoovieCard from './small-movie-card.jsx';

configure({adapter: new Adapter()});

const mock = {
  id: 1,
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  cover: ``,
};

it(`SmallMoovieCard click handler takes a movie card as argument`, () => {
  const titleClickHandler = jest.fn((movie) => movie);

  const app = shallow(<SmallMoovieCard
    movie={mock}
    onClick={titleClickHandler}
  />);

  const cardTitle = app.find(`.small-movie-card__title`).first();
  cardTitle.simulate(`click`, {preventDefault() {}});
  expect(titleClickHandler.mock.calls[0][0]).toBe(mock);
});
