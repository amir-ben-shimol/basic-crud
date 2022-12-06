import http from "http";

import sequelize from "./utils/database";

import app from "./app";

const port = process.env.PORT!;
const server = http.createServer(app);

sequelize
  .sync()
  .then(() => {
    server.listen(port);

    console.log(`Server is running on port: ${port}`);
  })
  .catch((error) => {
    console.log(`Failed to initate the database with an error: ${error}`);
  });
