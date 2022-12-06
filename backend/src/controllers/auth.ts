import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

import User from "../models/user";
import { IDecodedToken } from "../interfaces/auth";

const register = async (req: Request, res: Response) => {
  const username = req.body["username"];
  const password = req.body["password"];

  if (!username || !password) {
    res.status(400).send("username or password is missing");

    return;
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (user) {
      res.status(400).send("USERNAME ALREADY EXISTS");

      return;
    }

    const passwordHash = await bcryptjs.hash(password, 12);

    const createdUser = await User.create({
      username,
      passwordHash,
    });

    const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "2w",
    });

    let isAdmin = false;

    if (username === process.env.ADMIN_USERNAME!) {
      isAdmin = true;
    }

    const allOtherUsers = await User.findAll({
      where: { id: { [Op.ne]: createdUser.id } },
    });

    res.status(201).send({ users: allOtherUsers, token, isAdmin });

    return;
  } catch (e) {
    res.status(500).send("SERVER ERROR");

    return;
  }
};

const login = async (req: Request, res: Response) => {
  const username = req.body["username"];
  const password = req.body["password"];

  if (!username || !password) {
    res.status(400).send("username or password is missing");

    return;
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(404).send("USER NOT FOUND");

      return;
    }

    const passwordMatch = await bcryptjs.compare(password, user.passwordHash);

    if (!passwordMatch) {
      res.status(400).send("COULD NOT AUTHENTICATE");

      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "2w",
    });

    let isAdmin = false;

    if (username === process.env.ADMIN_USERNAME!) {
      isAdmin = true;
    }

    const allOtherUsers = await User.findAll({
      attributes: ["username"],
      where: { id: { [Op.ne]: user.id } },
    });

    res.status(201).send({ users: allOtherUsers, token, isAdmin });

    return;
  } catch {
    res.status(500).send("SERVER ERROR");

    return;
  }
};

const autoLogin = async (req: Request, res: Response) => {
  const tokenHeader = req.header("Authorization") as string | undefined;
  const token = tokenHeader?.split(" ")[1];

  if (!token) {
    res.status(401).send("UNAUTHORIZED");

    return;
  }

  let userId: number;

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as IDecodedToken;

    userId = decodedToken.id;
  } catch {
    res.status(401).send("UNAUTHORIZED");

    return;
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(401).send("UNAUTHORIZED");

      return;
    }

    const allOtherUsers = await User.findAll({
      where: { id: { [Op.ne]: user.id } },
    });

    let isAdmin = false;

    if (user.username === process.env.ADMIN_USERNAME!) {
      isAdmin = true;
    }

    res
      .status(201)
      .send({ users: allOtherUsers, username: user.username, isAdmin });

    return;

    return;
  } catch {
    res.status(500).send("SERVER ERROR");

    return;
  }
};

const editUser = async (req: Request, res: Response) => {
  const username = req.body["username"];
  const newUsername = req.body["newUsername"];

  try {
    // Check the provided username does not exist
    const userDB = await User.findOne({ where: { username: newUsername } });

    // If exists, block the action
    if (userDB) {
      res.status(400).send("PROVIDED USERNAME ALREADY EXISTS");

      return;
    }

    await User.update({ username: newUsername }, { where: { username } });

    res.status(200).send("SUCCESSFULLY EDITED");

    return;
  } catch {
    res.status(500).send("SERVER ERROR");

    return;
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const username = req.body["username"];

  try {
    await User.destroy({ where: { username } });

    res.status(200).send("SUCCESSFULLY EDITED");

    return;
  } catch {
    res.status(500).send("SERVER ERROR");

    return;
  }
};

const createUser = async (req: Request, res: Response) => {
  const username = req.body["username"];
  const password = req.body["password"];

  if (!username || !password) {
    res.status(400).send("username or password is missing");

    return;
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (user) {
      res.status(400).send("USERNAME ALREADY EXISTS");

      return;
    }

    const passwordHash = await bcryptjs.hash(password, 12);

    const createdUser = await User.create({
      username,
      passwordHash,
    });

    const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "2w",
    });

    const isAdmin = false;

    const allOtherUsers = await User.findAll({
      where: { id: { [Op.ne]: createdUser.id } },
    });

    res.status(201).send({ users: allOtherUsers, token, isAdmin });

    return;
  } catch (e) {
    res.status(500).send("SERVER ERROR");

    return;
  }
};

export { register, login, autoLogin, editUser, deleteUser, createUser };
