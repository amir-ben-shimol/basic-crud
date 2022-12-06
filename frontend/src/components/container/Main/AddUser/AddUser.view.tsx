import React from "react";
import { Link } from "react-router-dom";

// import classes from './AddUser.module.scss';

interface IProps {
  readonly userNameInput: string;
  readonly userPasswordInput: string;
  readonly onUserNameInputChange: (input: string) => void;
  readonly onUserPasswordInputChange: (input: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

const AddUserView: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  return (
    <>
      <h1>REGISTER PAGE</h1>
      <form onSubmit={props.onSubmit}>
        <input
          type={"name"}
          placeholder="Enter User Name"
          value={props.userNameInput ?? ""}
          onChange={({ currentTarget: { value } }) =>
            props.onUserNameInputChange(value)
          }
        />

        <input
          type={"password"}
          placeholder="Enter User Pasword"
          value={props.userPasswordInput ?? ""}
          onChange={({ currentTarget: { value } }) =>
            props.onUserPasswordInputChange(value)
          }
        />
        <button type="submit">Add user</button>
      </form>

      <Link to="/welcome">Back to table</Link>
    </>
  );
};

AddUserView.displayName = "AddUserView";
AddUserView.defaultProps = {};

export default React.memo(AddUserView);
