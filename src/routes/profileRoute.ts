import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/ExtendRequest";
import { addorEditPost } from "../services/profileService";
import { profileModel } from "../models/profileModel";
import { userModel } from "../models/userModel";
import multer from "multer";

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

router.get("/me", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const profile = await profileModel
      .findOne({ userId })
      .populate("userId", "firstName");

    if (!profile) {
      res.status(400).json("There is no Profile for this user");
      return;
    }

    res.status(200).json(profile);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const profiles = await profileModel.find().populate("userId", "firstName");

    res.status(200).json(profiles);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.get("/:user_id", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const profile = await profileModel
      .findOne({ userId: req.params.user_id })
      .populate("userId", "firstName");

    if (!profile) {
      res.status(400).json("There is no Profile for the given user");
      return;
    }

    res.status(200).json(profile);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  //delete post , profile , user
  //TODO : Include deleting posts
  await profileModel.findOneAndDelete({ userId: req.user._id });
  await userModel.findByIdAndDelete({ _id: req.user._id });
});

router.post("upload", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "public/images");
      },
       filename: function (req, file, cb) {
        const extendedReq = req as ExtendRequest;
        if (!extendedReq.user || !extendedReq.user._id) {
          return cb(new Error("User not found in request"), "");
        }

        cb(null, `${extendedReq.user._id}`);
      },
    });

    const upload = multer({ storage: storage }).single("");
    upload(req, res, async (err) => {
      if (err) {
        res.status(500).json("something went wrong !");
      } else {
        res.status(200).send(req.user._id);
      }
    });
  } catch {
    res.status(500).json("something went wrong !");
  }
});
export default router;
