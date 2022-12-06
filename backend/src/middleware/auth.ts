import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IDecodedToken } from "../interfaces/auth";

import User from "../models/user";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the token from the header
    const tokenHeader = req.header("Authorization") as string | undefined;
    const token = tokenHeader?.split(" ")[1];

    if (!token) {
      res.status(401).send("UNAUTHORIZED");

      return;
    }

    // Verify the token is valid
    const data = jwt.verify(token, process.env.JWT_SECRET!) as IDecodedToken;

    const adminDocument = await User.findByPk(data.id);

    if (
      !adminDocument ||
      adminDocument.username !== process.env.ADMIN_USERNAME
    ) {
      res.status(401).send("UNABLE TO AUTHENTICATE AS ADMIN");

      return;
    }

    next();
  } catch (e: any) {
    res.status(401).send("UNABLE TO AUTHENTICATE AS ADMIN");

    return;
  }
};

export { adminAuth };
