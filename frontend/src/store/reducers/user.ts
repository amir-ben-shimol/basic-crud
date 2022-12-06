import type { IUser } from "../../interfaces/user";
import { IUsers } from "../../interfaces/users";
import * as actions from "../actions/user";

const initialState: State = {
  user: null,
  users: [],
  isAdmin: false,
};

export interface State {
  user: IUser | null;
  users: IUsers[];
  isAdmin: boolean;
}

export const reducer = (
  state: State = initialState,
  action: actions.UserTypes
): State => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
      };
    case actions.UNSET_USER:
      return { ...state, user: null };
    case actions.SET_USERS:
      return { ...state, users: action.payload.users };
    default:
      return state;
  }
};
