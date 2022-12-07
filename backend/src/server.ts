import http from "http";

// import sequelize from "./utils/database";

import app from "./app";

const port = process.env.PORT!;
const server = http.createServer(app);


server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port: ${port}`);
});
