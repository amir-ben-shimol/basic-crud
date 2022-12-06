import { DataTypes, Model, Optional } from "sequelize";

import IDBAttribute from "../interfaces/db-table";
import sequelize from "../utils/database";

interface IUserAttributes extends IDBAttribute {
  username: string;
  passwordHash: string;
}

class User
  extends Model<Optional<IUserAttributes, "id">>
  implements IUserAttributes
{
  public id!: number;
  public username!: string;
  public passwordHash!: string;
}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

export default User;
