import React from 'react';
import renderer from 'react-test-renderer';

import {AddReview} from './add-review';

const movieMock = {"name": `Aviator`, "posterImage": `https://es31-server.appspot.com/wtw/static/film/poster/Aviator.jpg`, "previewImage": `https://es31-server.appspot.com/wtw/static/film/preview/aviator.jpg`, "backgroundImage": `https://es31-server.appspot.com/wtw/static/film/background/Aviator.jpg`, "backgroundColor": `#D6CDAF`, "description": `A biopic depicting the early years of legendary Director and aviator Howard Hughes' career from the late 1920s to the mid 1940s.`, "rating": 3.8, "scoresCount": 307174, "director": `Martin Scorsese`, "starring": [`leonardoDiCaprio`, `cateBlanchett`, `kateBeckinsale`], "runTime": 170, "genre": `Drama`, "released": 2014, "id": 2, "isFavorite": false, "videoLink": `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`, "previewVideoLink": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`};

it(`AddReview is rendered correctly`, () => {
  const tree = renderer.create(<AddReview
    movie={movieMock}
    history={{push: jest.fn()}}
    isFormValid={false}
    isFormSending={false}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
