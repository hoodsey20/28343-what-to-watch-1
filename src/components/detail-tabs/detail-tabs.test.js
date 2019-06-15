import React from 'react';
import renderer from 'react-test-renderer';

import {DetailTabs} from './detail-tabs.jsx';

const movieMock = {"name": `Aviator`, "posterImage": `https://es31-server.appspot.com/wtw/static/film/poster/Aviator.jpg`, "previewImage": `https://es31-server.appspot.com/wtw/static/film/preview/aviator.jpg`, "backgroundImage": `https://es31-server.appspot.com/wtw/static/film/background/Aviator.jpg`, "backgroundColor": `#D6CDAF`, "description": `A biopic depicting the early years of legendary Director and aviator Howard Hughes' career from the late 1920s to the mid 1940s.`, "rating": 3.8, "scoresCount": 307174, "director": `Martin Scorsese`, "starring": [`leonardoDiCaprio`, `cateBlanchett`, `kateBeckinsale`], "runTime": 170, "genre": `Drama`, "released": 2014, "id": 2, "isFavorite": false, "videoLink": `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`, "previewVideoLink": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`};

const reviewsMock = [{"id": 1, "user": {"id": 13, "name": `Zak`}, "rating": 4, "comment": `I really find it difficult to believe this movie is rated highly by people. It's hands down the worst movie I've seen in my life`, "date": `2019-05-27T15:15:34.699Z`}, {"id": 2, "user": {"id": 12, "name": `Isaac`}, "rating": 4, "comment": `The editing is a mess, and the transitions of the plot or characters are rather strange. There is no narrative focus and the storytelling is unbalanced. I cannot really understand why such a bad movie received an overwhelming approval from the critics. `, "date": `2019-06-03T15:15:34.699Z`}];

const mockTabs = {
  0: `Overview`,
  1: `Details`,
  2: `Reviews`,
};

it(`Movie Detail Page is rendered correctly`, () => {
  const tree = renderer.create(<DetailTabs
    movie={movieMock}
    reviews={reviewsMock}
    tabs={mockTabs}
    changeTabHandler={jest.fn()}
    activeTab={0}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
