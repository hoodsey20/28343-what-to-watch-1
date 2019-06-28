import ActionTypes from './action-types';
import {reducer} from './reducer';

const {
  SET_USER_DATA,
  SET_USER_ERROR,
} = ActionTypes;

const initialState = {
  error: null,
  user: null,
};

describe(`User reducer works correctly`, () => {
  it(`Should take user data`, function () {
    const mockUser = {
      name: `user`,
      id: 1,
    };
    const mockUser2 = {
      name: `user`,
      id: 1,
    };
    const nextState = reducer(initialState, {type: SET_USER_DATA, payload: mockUser});
    expect(nextState.user).toBe(mockUser);
    expect(nextState.error).toBe(null);

    const nextState2 = reducer(initialState, {type: SET_USER_DATA, payload: mockUser2});
    expect(nextState2.user).toBe(mockUser2);
    expect(nextState2.error).toBe(null);
  });

  it(`Should take error data`, function () {
    const mockError = `Error`;
    const nextState = reducer(initialState, {type: SET_USER_ERROR, payload: mockError});
    expect(nextState.user).toBe(null);
    expect(nextState.error).toBe(mockError);
  });
});
