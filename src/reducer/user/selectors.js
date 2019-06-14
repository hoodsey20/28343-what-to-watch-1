import changeCaseObject from 'change-case-object';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.USER;


export const userErrorSelector = (state) => state[NAME_SPACE].error;
export const userDataSelector = (state) => {
  const currentUserData = state[NAME_SPACE].user;
  return currentUserData ? changeCaseObject.camelCase(currentUserData) : currentUserData;
};

