import { createStore, Reducer, combineReducers } from "redux";

import * as userActions from "./actions/user";
import * as fromUser from "./reducers/user";

type reducerTypes = userActions.UserTypes;

const rootReducer: Reducer<AppState, reducerTypes> = combineReducers({
  user: fromUser.reducer,
});

export interface AppState {
  user: fromUser.State;
}

export const store = createStore(rootReducer);
