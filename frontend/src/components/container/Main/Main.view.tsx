import React from "react";
import { Link } from "react-router-dom";
import { IUsers } from "../../../interfaces/users";
import UsersTable from "./UsersTable";

import classes from "./Main.module.scss";

interface IProps {
  readonly username: string;
  readonly users: IUsers[];
  readonly isAdmin: boolean;
  readonly onExitClick: () => void;
}

const MainView: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <section className={classes["container"]}>
      <div className={classes["innerHeader"]}>
        <h1
          className={classes["innerHeader__title"]}
          style={{ border: "5px solid blue" }}
        >
          Main
        </h1>
      </div>

      <UsersTable usersList={props.users} isAdmin={props.isAdmin} />

      <Link to="/login" className={classes["backToLoginButtonContainer"]}>
        <button
          className={classes["backToLoginButtonContainer__button"]}
          type="button"
          onClick={props.onExitClick}
        >
          Logout
        </button>
      </Link>
    </section>
  );
};

MainView.displayName = "MainView";
MainView.defaultProps = {};

export default MainView;
