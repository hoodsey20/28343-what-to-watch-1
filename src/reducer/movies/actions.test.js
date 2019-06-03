import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';

import {Operation} from './actions';
import actionTypes from './actionTypes';


describe(`Fetching films data works correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const moviesLoader = Operation.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: actionTypes.LOAD_MOVIES,
          payload: [{fake: true}],
        });
      });
  });
});
