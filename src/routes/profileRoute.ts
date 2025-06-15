import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/ExtendRequest";
import { addorEditPost } from "../services/profileService";

const router = express.Router();

router.post("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const {
      company,
      website,
      country,
      location,
      status,
      skills,
      bio,
      experience,
      education,
      social,
      date,
    } = req.body;
    const { statusCode, data } = await addorEditPost({
      company,
      website,
      country,
      location,
      status,
      skills,
      bio,
      experience,
      education,
      social,
      date,
      userId,
    });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).json("something went wrong !");
  }
});
export default router;
