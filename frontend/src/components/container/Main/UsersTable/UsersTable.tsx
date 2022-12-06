import React from "react";
import { IUsers } from "../../../../interfaces/users";

import UsersTableView from "./UsersTable.view";

interface IProps {
  readonly usersList: IUsers[];
  readonly isAdmin: boolean;
}

const UsersTable: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  return <UsersTableView usersList={props.usersList} isAdmin={props.isAdmin} />;
};

UsersTable.displayName = "UsersTable";
UsersTable.defaultProps = {};

export default React.memo(UsersTable);
