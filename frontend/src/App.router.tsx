import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";

import * as fromApp from "./store/app";
import * as userActions from "./store/actions/user";
import { IUser } from "./interfaces/user";
import { IUsers } from "./interfaces/users";

interface IPropsFromDispatch {
  setUser: (user: IUser, isAdmin: boolean) => userActions.SetUser;
  setUsers: (users: IUsers[]) => userActions.SetUsers;
}

interface PropsFromState {
  readonly isAuthenticated: boolean;
  readonly isAdmin: boolean;
}

interface IProps extends PropsFromState, IPropsFromDispatch {}

const Main = React.lazy(() => import("./pages/Main"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const AddUser = React.lazy(() => import("./components/container/Main/AddUser"));
const EditUser = React.lazy(
  () => import("./components/container/Main/EditUser")
);

const AppRouter: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/auto-login`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        props.setUser({ username: data.data.username }, data.data.isAdmin);

        const users = data.data.users;

        if (users) {
          props.setUsers(users);
        }
      });
  }, []);

  return (
    <Routes>
      {!props.isAuthenticated && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
      {props.isAuthenticated && (
        <>
          <Route path="" element={<Main />} />
          <Route path="*" element={<Navigate to="/" replace />} />

          {props.isAdmin && (
            <>
              <Route
                path="/add-user"
                element={<AddUser isAdmin={props.isAdmin} />}
              />
              <Route
                path="/edit-user/:username"
                element={<EditUser isAdmin={props.isAdmin} />}
              />
            </>
          )}
        </>
      )}
    </Routes>
  );
};

AppRouter.displayName = "AppRouter";
AppRouter.defaultProps = {};

const mapDispatchToProps = (
  dispatch: Dispatch<userActions.UserTypes>
): IPropsFromDispatch => {
  return {
    setUser: (user: IUser, isAdmin: boolean): userActions.SetUser =>
      dispatch(userActions.setUser(user, isAdmin)),
    setUsers: (users: IUsers[]): userActions.SetUsers =>
      dispatch(userActions.setUsers(users)),
  };
};

const mapStateToProps = (state: fromApp.AppState) => {
  return {
    isAuthenticated: !!state.user.user,
    isAdmin: state.user.isAdmin,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
