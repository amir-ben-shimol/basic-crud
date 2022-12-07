import express from "express";

import apiRouter from "./routers/auth";
import newsRouter from "./routers/news";

import cors from "cors";

const app: express.Application = express();


app.use(cors());

// Get the data string and convert it to an object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", apiRouter);
app.use("/api/news", newsRouter);

export default app;
