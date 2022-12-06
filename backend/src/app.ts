import express from "express";

import apiRouter from "./routers/auth";

const app: express.Application = express();

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.HTTP_ACCESS_IP!); // What IPs can access this server
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PATCH, DELETE, PUT"
    );
    next();
  }
);

// Get the data string and convert it to an object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", apiRouter);

export default app;
