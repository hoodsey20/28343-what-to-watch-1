import ActionTypes from "./types";

const { SET_USER_DATA, SET_USER_ERROR } = ActionTypes;

export const ActionCreator = {
  setUserData: data => ({
    type: SET_USER_DATA,
    payload: data
  }),
  setUserError: data => ({
    type: SET_USER_ERROR,
    payload: data
  })
};

export const Operation = {
  getUserData: authData => (dispatch, _getState, api) => {
    dispatch(ActionCreator.setUserError(null));
    return api.post(`/login`, authData).then(response => {
      if (response.data) {
        dispatch(ActionCreator.setUserData(response.data));
      } else {
        dispatch(
          ActionCreator.setUserError(response ? response : `Unexpected error`)
        );
      }
    });
  },
  getCurrentUser: () => (dispatch, _getState, api) => {
    return api
      .get(`/login`)
      .then(response => {
        if (response.data) {
          dispatch(ActionCreator.setUserData(response.data));
          return true;
        }
        return false;
      })
      .catch(() => false);
  }
};
