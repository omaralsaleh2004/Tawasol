import express from "express";
import { Login, register } from "../services/userService";

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
    res.status(statusCode).send(data);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { statusCode, data } = await Login({ email, password });
    res.status(statusCode).send(data);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

export default router;
