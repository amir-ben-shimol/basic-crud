import React, { useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import axios, { AxiosError } from "axios";

import { IUser } from "../../../interfaces/user";
import * as userActions from "../../../store/actions/user";

import LoginView from "./Login.view";
import { IUsers } from "../../../interfaces/users";

interface IPropsFromDispatch {
  setUser: (user: IUser, isAdmin: boolean) => userActions.SetUser;
  setUsers: (users: IUsers[]) => userActions.SetUsers;
}

interface IProps extends IPropsFromDispatch {}

const Login: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [userNameInputState, setUserNameInputState] = useState<string>("");
  const [userPasswordInputState, setUserPasswordInputState] =
    useState<string>("");

  const onUserNameInputChange = (input: string) =>
    setUserNameInputState(() => input);
  const onUserPasswordInputChange = (input: string) =>
    setUserPasswordInputState(() => input);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userNameInputState.length > 0) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
          username: userNameInputState,
          password: userPasswordInputState,
        })
        .then((data) => {
          props.setUser(
            {
              username: userNameInputState,
            },
            data.data.isAdmin
          );

          const token = data.data.token;

          localStorage.setItem("token", token);

          const users = data.data.users;

          if (users) {
            props.setUsers(users);
          }
        })
        .catch((err: AxiosError) => {
          alert(err.response?.data);
        });
    }
  };

  return (
    <LoginView
      userNameInput={userNameInputState}
      userPasswordInput={userPasswordInputState}
      onUserNameInputChange={onUserNameInputChange}
      onUserPasswordInputChange={onUserPasswordInputChange}
      onSubmit={onSubmit}
    />
  );
};

Login.displayName = "Login";
Login.defaultProps = {};

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

export default connect(null, mapDispatchToProps)(React.memo(Login));
