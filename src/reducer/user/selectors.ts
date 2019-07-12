import * as camelcaseKeys from "camelcase-keys";
import NameSpace from "../name-spaces";
import { ErrorType, UserType } from "./types";
import { AppState } from "../reducer";
const NAME_SPACE: string = NameSpace.USER;

export const userErrorSelector = (state: AppState): ErrorType =>
  state[NAME_SPACE].error;

export const userDataSelector = (state: AppState): UserType => {
  const currentUserData = state[NAME_SPACE].user;
  return currentUserData ? camelcaseKeys(currentUserData) : currentUserData;
};
