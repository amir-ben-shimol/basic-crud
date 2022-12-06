import type { IUser } from "../../interfaces/user";
import { IUsers } from "../../interfaces/users";

export const SET_USER = "[User] Set User";

export const UNSET_USER = "[User] Unset User";

export const SET_USERS = "[Users] Set Users";

export interface SetUser {
  type: typeof SET_USER;
  payload: { user: IUser; isAdmin: boolean };
}

export interface UnsetUser {
  type: typeof UNSET_USER;
}

export interface SetUsers {
  type: typeof SET_USERS;
  payload: { users: IUsers[] };
}

export const setUser = (user: IUser, isAdmin: boolean): SetUser => {
  return {
    type: SET_USER,
    payload: { user, isAdmin },
  };
};

export const unsetUser = (): UnsetUser => {
  return {
    type: UNSET_USER,
  };
};

export const setUsers = (users: IUsers[]): SetUsers => {
  return {
    type: SET_USERS,
    payload: { users },
  };
};

export type UserTypes = SetUser | UnsetUser | SetUsers;
