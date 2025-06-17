import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/ExtendRequest";
import { userModel } from "../models/userModel";
import { postModel } from "../models/postModel";

const router = express.Router();

router.post("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    if (!req.body.text) {
      res.status(401).json("Text is required");
      return;
    }
    const user = await userModel.findById(req.user._id).select("-password");

    if (!user) {
      res.status(404).json("User not found");
      return;
    }
    const newPost = new postModel({
      text: req.body.text,
      name: user.firstName,
      userId: req.user._id,
    });

    const post = await newPost.save();

    res.status(200).send(post);
  } catch (err) {
    console.log(err);
    res.status(500).json("something went wrong !");
  }
});
export default router;
