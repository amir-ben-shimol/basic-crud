import express from "express";

import { getNews } from "../controllers/news";

const router = express.Router();

router.get("/", getNews);

export default router;