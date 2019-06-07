import changeCaseObject from 'change-case-object';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.USER;

export const authReqSelector = (state) => state[NAME_SPACE].isAuthorizationRequired;
export const userDataSelector = (state) => {
  const currentUserData = state[NAME_SPACE].user;
  return currentUserData ? changeCaseObject.camelCase(currentUserData) : currentUserData;
};

