import actionTypes from './actionTypes';

const {
  REQUIRED_AUTHORIZATION
} = actionTypes;

export const ActionCreator = {
  requireAuthorization: (status) => ({
    type: REQUIRED_AUTHORIZATION,
    payload: status,
  }),
};
