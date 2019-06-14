import ActionTypes from './action-types';

const {
  REQUIRED_AUTHORIZATION,
  SET_USER_DATA,
} = ActionTypes;

export const ActionCreator = {
  requireAuthorization: (status) => ({
    type: REQUIRED_AUTHORIZATION,
    payload: status,
  }),

  setUserData: (data) => ({
    type: SET_USER_DATA,
    payload: data,
  }),
};

export const Operation = {
  getUserData: (authData) => (dispatch, _getState, api) => {
    return api.post(`/login`, authData)
      .then((response) => {
        dispatch(ActionCreator.setUserData(response.data));
      });
  },
};
