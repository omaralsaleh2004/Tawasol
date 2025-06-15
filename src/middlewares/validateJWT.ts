import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { ExtendRequest } from "../types/ExtendRequest";
export const validateJWT = (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationheader = req.get("authorization");

  if (!authorizationheader) {
    res.status(403).send("no Authorization header was not provided");
    return;
  }

  const token = authorizationheader.split(" ")[1];

  if (!token) {
    res.status(403).send("Bearer token not found");
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET || "", async (err, payload) => {
    if (err) {
      res.status(403).send("Invalid token");
      return;
    }
    if (!payload) {
      res.status(403).send("Invalid payload");
      return;
    }

    const userPayload = payload as {
      email: string;
      firstName: string;
      lastName: string;
    };

    const user = await userModel.findOne({ email: userPayload.email });
    req.user = user;
    next();
  });
};
