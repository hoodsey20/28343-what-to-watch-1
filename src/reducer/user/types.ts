export const ActionTypes = {
  SET_USER_DATA: `SET_USER_DATA` as const,
  SET_USER_ERROR: `SET_USER_ERROR` as const
};

export interface User {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
}

type SetUserData = {
  type: typeof ActionTypes.SET_USER_DATA;
  payload: User | null;
};

type SetUserError = {
  type: typeof ActionTypes.SET_USER_ERROR;
  payload: string | null;
};

export type ErrorType = string | null;
export type UserType = User | null;

export type UserActionTypes = SetUserData | SetUserError;

export type UserState = {
  user: UserType;
  error: ErrorType;
};
