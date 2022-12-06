import express from "express";
import { adminAuth } from "../middleware/auth";

import {
  autoLogin,
  login,
  register,
  editUser,
  deleteUser,
  createUser,
} from "../controllers/auth";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/auto-login", autoLogin);

router.post("/edit-user", adminAuth, editUser);

router.post("/delete", adminAuth, deleteUser);

router.post("/add-user", adminAuth, createUser);

export default router;
