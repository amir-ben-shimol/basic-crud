import { Sequelize } from "sequelize";

const sequelize = new Sequelize("intango-db", "root", "amir1102", {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});

export default sequelize;
