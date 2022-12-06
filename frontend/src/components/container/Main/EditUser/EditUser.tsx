import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";

import EditUserView from "./EditUser.view";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import * as userActions from "../../../../store/actions/user";
import * as fromApp from "../../../../store/app";
import { IUser } from "../../../../interfaces/user";
import { IUsers } from "../../../../interfaces/users";

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

const EditUser: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const [userNameInputState, setUserNameInputState] = useState<string>("");

  const onUserNameInputChange = (input: string) =>
    setUserNameInputState(() => input);
  const { username } = useParams<{ username: string }>();

  const navigate = useNavigate();

  const oldUsers = props.users;

  const onDeleteUser = () => {
    const token = localStorage.getItem("token");

    axios

      .post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/delete`,
        {
          username: username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        const oldUsers = props.users;

        // Find the index in the state of the username
        const userIndex = oldUsers.findIndex(
          (user) => user.username === username
        );

        if (userIndex !== -1) {
          oldUsers.splice(userIndex, 1);

          props.setUsers(oldUsers);
        }

        navigate("/welcome");
      })
      .catch((err: AxiosError) => {
        alert(err.response?.data);
      });
  };

  const onSubmit = (e: React.FormEvent) => {
    const token = localStorage.getItem("token");
    e.preventDefault();

    if (userNameInputState.length > 0) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/edit-user`,
          {
            username: username,
            newUsername: userNameInputState,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          props.setUser(
            {
              username: userNameInputState,
            },
            props.isAdmin
          );
          props.setUsers(props.users);

          // Find the index in the state of the old username
          const userIndex = oldUsers.findIndex(
            (user) => user.username === username
          );

          if (userIndex !== -1) {
            oldUsers[userIndex] = {
              ...oldUsers[userIndex],
              username: userNameInputState,
            };

            props.setUsers(oldUsers);
          }
          navigate("/welcome");
        })
        .catch((err: AxiosError) => {
          alert(err.response?.data);
        });
    }
  };

  return (
    <EditUserView
      username={username!}
      userNameInput={userNameInputState}
      onSubmit={onSubmit}
      onUserNameInputChange={onUserNameInputChange}
      onDeleteUser={onDeleteUser}
    />
  );
};

EditUser.displayName = "EditUser";
EditUser.defaultProps = {};

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
    users: state.user.users,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(EditUser));
