import React from "react";

import classes from "./EditUser.module.scss";

interface IProps {
  readonly username: string;
  readonly userNameInput: string;
  readonly onUserNameInputChange: (input: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly onDeleteUser: () => void;
}

const EditUserView: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  return (
    <section className={classes["editUserSection"]}>
      <h1>edit</h1>
      <form onSubmit={props.onSubmit}>
        <input
          type={"name"}
          placeholder="Enter New User Name"
          value={props.userNameInput ?? ""}
          onChange={({ currentTarget: { value } }) =>
            props.onUserNameInputChange(value)
          }
        />
        <button type="submit">Finish</button>
      </form>
      <button type="button" onClick={props.onDeleteUser}>
        Delete
      </button>
    </section>
  );
};

EditUserView.displayName = "EditUserView";
EditUserView.defaultProps = {};

export default React.memo(EditUserView);
