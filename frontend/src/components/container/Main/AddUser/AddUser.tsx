import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import * as userActions from "../../../store/../../store/actions/user";
import * as fromApp from "../../../../store/app";

import { IUser } from "../../../../interfaces/user";
import { IUsers } from "../../../../interfaces/users";

import AddUserView from "./AddUser.view";

interface IPropsFromState {
  readonly users: IUsers[];
}

interface IPropsFromDispatch {
  setUser: (user: IUser, isAdmin: boolean) => userActions.SetUser;
  setUsers: (users: IUsers[]) => userActions.SetUsers;
}

interface IProps extends IPropsFromState, IPropsFromDispatch {
  readonly isAdmin: boolean;
}

const AddUser: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [userNameInputState, setUserNameInputState] = useState<string>("");
  const [userPasswordInputState, setUserPasswordInputState] =
    useState<string>("");

  const onUserNameInputChange = (input: string) =>
    setUserNameInputState(() => input);
  const onUserPasswordInputChange = (input: string) =>
    setUserPasswordInputState(() => input);

  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userNameInputState.length > 0) {
      const token = localStorage.getItem("token");

      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/add-user`,
          {
            username: userNameInputState,
            password: userPasswordInputState,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          const oldUsers = props.users;

          const newUsers = [...oldUsers, { username: userNameInputState }];

          props.setUsers(newUsers);

          navigate("/main");
        })
        .catch((err: AxiosError) => {
          alert(err.response?.data);
        });
    }
  };

  return (
    <AddUserView
      userNameInput={userNameInputState}
      userPasswordInput={userPasswordInputState}
      onUserNameInputChange={onUserNameInputChange}
      onUserPasswordInputChange={onUserPasswordInputChange}
      onSubmit={onSubmit}
    />
  );
};

AddUser.displayName = "AddUser";
AddUser.defaultProps = {};

const mapStateToProps = (state: fromApp.AppState) => {
  return {
    users: state.user.users,
  };
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AddUser));
