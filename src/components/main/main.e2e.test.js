import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Main from './main.jsx';

configure({adapter: new Adapter()});


it(`Main once clicked title fired once`, () => {
  const titleClickHandler = jest.fn();
  const mock = [`first`, `second`, `third`];

  const app = shallow(<Main
    movies={mock}
    onTitleClick={titleClickHandler}
  />);

  const cardTitle = app.find(`.small-movie-card__title`).first();
  cardTitle.simulate(`click`, {preventDefault() {}});
  expect(titleClickHandler).toHaveBeenCalledTimes(1);
});


