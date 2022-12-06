import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IUsers } from "../../../interfaces/users";
import * as fromApp from "../../../store/app";
import * as userActions from "../../../store/actions/user";

import MainView from "./Main.view";

interface IPropsFromState {
  readonly username: string;
  readonly users: IUsers[];
  readonly isAdmin: boolean;
}

interface IPropsFromDispatch {
  unsetUser: () => userActions.UnsetUser;
  setUsers: (users: IUsers[]) => userActions.SetUsers;
}

interface IProps extends IPropsFromState, IPropsFromDispatch {}

const Main: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const onExitClick = () => {
    props.unsetUser();
    props.setUsers([]);

    localStorage.removeItem("token");
  };

  console.log("in m,aijn");

  return (
    <MainView
      onExitClick={onExitClick}
      username={props.username}
      users={props.users}
      isAdmin={props.isAdmin}
    />
  );
};

Main.displayName = "Main";
Main.defaultProps = {};

const mapDispatchToProps = (
  dispatch: Dispatch<userActions.UserTypes>
): IPropsFromDispatch => {
  return {
    unsetUser: (): userActions.UnsetUser => dispatch(userActions.unsetUser()),
    setUsers: (users: IUsers[]): userActions.SetUsers =>
      dispatch(userActions.setUsers(users)),
  };
};

const mapStateToProps = (state: fromApp.AppState) => {
  return {
    username: state.user.user!.username,
    users: state.user.users,
    isAdmin: state.user.isAdmin,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main));
