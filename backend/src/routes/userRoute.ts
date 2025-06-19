import express from "express";
import { Login, register } from "../services/userService";
import { validateJWT } from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/ExtendRequest";
import { userModel } from "../models/userModel";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { statusCode, data } = await Login({ email, password });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    res.status(201).json(user);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

export default router;
