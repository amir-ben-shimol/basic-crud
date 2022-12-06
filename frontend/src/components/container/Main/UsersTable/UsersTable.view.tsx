import React from "react";
import { Link } from "react-router-dom";

import { IUsers } from "../../../../interfaces/users";

import classes from "./UsersTable.module.scss";

interface IProps {
  readonly usersList: IUsers[];
  readonly isAdmin: boolean;
}

const UsersTableView: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  return (
    <div className={classes["usersListContainer"]}>
      {props.usersList!.map((user, index) => (
        <>
          <div className={classes["innerUsersList"]}>
            <div className={classes["userInformation"]}>
              <span className={classes["userInformation__title"]}>
                User name:
              </span>
              <span className={classes["userInformation__name"]} key={index}>
                {user.username}
              </span>
              {props.isAdmin && (
                <Link to={`/edit-user/${user.username}`}>Edit</Link>
              )}
            </div>
          </div>
          <hr className={classes["usersListContainer__divider"]} />
        </>
      ))}
      {props.isAdmin && <Link to="/add-user">Add user</Link>}
    </div>
  );
};

UsersTableView.displayName = "UsersTableView";
UsersTableView.defaultProps = {};

export default React.memo(UsersTableView);
