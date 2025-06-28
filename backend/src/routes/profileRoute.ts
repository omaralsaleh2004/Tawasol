import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/ExtendRequest";
import { addorEditPost } from "../services/profileService";
import { profileModel } from "../models/profileModel";
import { userModel } from "../models/userModel";
import multer from "multer";
import { postModel } from "../models/postModel";
import { upload } from "../middlewares";

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
  await Promise.all([
    postModel.deleteMany({ userId: req.user._id }),
    profileModel.findOneAndDelete({ userId: req.user._id }),
    userModel.findByIdAndDelete({ _id: req.user._id }),
  ]);

  res.status(200).json("User information is deleted succesfully");
});

router.post("/upload", validateJWT, async (req: ExtendRequest, res) => {
  try {
    console.log("inside upload");

    upload(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        res.status(500).send(`Multer Error: ${err}`);
        return;
      }

      try {
        console.log("Uploaded file:", req.file);
        res.status(200).send(req.user._id);
      } catch (err) {
        console.error("Inner error:", err);
        res.status(500).send(`Server Error: ${err}`);
      }
    });
  } catch (err) {
    console.error("Outer error:", err);
    res.status(500).send(`Server Error: ${err}`);
  }
});

router.put("/experience", validateJWT, async (req: ExtendRequest, res) => {
  try {
    if (!req.body.title) {
      res.status(401).json("Title is required");
      return;
    }
    if (!req.body.company) {
      res.status(401).json("Company is required");
      return;
    }
    if (!req.body.from) {
      res.status(401).json("From date is required and needs to be from past");
      return;
    }

    if (req.body.to) {
      const isNotValid = req.body.to < req.body.from;
      if (isNotValid) {
        res.status(401).json("Invalid date !");
        return;
      }
    }

    const profile = await profileModel.findOne({ userId: req.user._id });
    if (!profile) {
      res.status(404).json("Profile not found");
      return;
    }
    profile.experience.unshift(req.body);
    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json("something went wrong !");
  }
});

router.delete(
  "/experience/:exp_id",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const profile = await profileModel.findOne({ userId: req.user._id });

      if (!profile) {
        res.status(404).json("Profile not found");
        return;
      }

      profile.experience = profile.experience.filter(
        (exp) => exp._id.toString() !== req.params.exp_id
      );

      await profile.save();
      res.status(200).json(profile);
    } catch {
      res.status(500).json("something went wrong !");
    }
  }
);

router.put("/education", validateJWT, async (req: ExtendRequest, res) => {
  try {
    if (!req.body.school) {
      res.status(401).json("School is required");
      return;
    }
    if (!req.body.degree) {
      res.status(401).json("Degree is required");
      return;
    }
    if (!req.body.from) {
      res.status(401).json("From date is required and needs to be from past");
      return;
    }
    if (!req.body.fieldofstudy) {
      res.status(401).json("Feiled of study is required");
      return;
    }

    if (req.body.to) {
      const isNotValid = req.body.to < req.body.from;
      if (isNotValid) {
        res.status(401).json("Invalid date !");
        return;
      }
    }

    const profile = await profileModel.findOne({ userId: req.user._id });
    if (!profile) {
      res.status(404).json("Profile not found");
      return;
    }
    profile.education.unshift(req.body);
    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json("something went wrong !");
  }
});

router.delete(
  "/education/:edu_id",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const profile = await profileModel.findOne({ userId: req.user._id });

      if (!profile) {
        res.status(404).json("Profile not found");
        return;
      }

      profile.education = profile.education.filter(
        (edu) => edu._id.toString() !== req.params.edu_id
      );

      await profile.save();
      res.status(200).json(profile);
    } catch {
      res.status(500).json("something went wrong !");
    }
  }
);

export default router;
