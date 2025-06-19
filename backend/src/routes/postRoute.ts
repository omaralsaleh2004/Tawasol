import express, { text } from "express";
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

    res.status(200).json(post);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const posts = await postModel.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.get("/:id", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      res.status(404).json("Post not Found");
      return;
    }
    res.status(200).json(post);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.put("/like/:id", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      res.status(404).json("Post not Found");
      return;
    }

    for (let i in post.likes) {
      if (post.likes[i].userId.toString() === req.user._id.toString()) {
        res.status(401).json("Post already liked");
        return;
      }
    }

    post.likes.unshift({ userId: req.user._id });
    await post.save();
    res.status(200).json(post.likes);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.put("/unlike/:id", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      res.status(404).json("Post not Found");
      return;
    }

    for (let i in post.likes) {
      if (!post.likes[i].userId.toString() === req.user._id.toString()) {
        res.status(401).json("User has not liked the post previously");
        return;
      }
    }

    post.likes = post.likes.filter(
      (like) => like.userId.toString() !== req.user._id.toString()
    );
    await post.save();
    res.status(200).json(post.likes);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.post("/comment/:id", validateJWT, async (req: ExtendRequest, res) => {
  try {
    if (!req.body.text) {
      res.status(401).json("Text is required");
      return;
    }

    const user = await userModel.findById(req.user._id).select("-password");
    const post = await postModel.findById(req.params.id);

    if (!user) {
      res.status(404).json("User not found");
      return;
    }

    if (!post) {
      res.status(401).json("post not found");
      return;
    }

    const newComment = {
      text: req.body.text,
      name: user.firstName,
      userId: req.user._id,
      date: new Date(),
    };

    post.comments.unshift(newComment);
    await post.save();
    res.status(200).json(post.comments);
  } catch {
    res.status(500).json("something went wrong !");
  }
});

router.delete(
  "/comment/:id/:comment_id",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const post = await postModel.findById(req.params.id);

      if (!post) {
        res.status(401).json("post not found");
        return;
      }

      const comment = post.comments.find((comment) => {
        return comment._id?.toString() === req.params.comment_id;
      });

      if (!comment) {
        res.status(404).json("Comment does not exist");
        return;
      }

      if (comment.userId.toString() !== req.user._id.toString()) {
        res.status(401).json("User is not authorized");
        return;
      }

      post.comments = post.comments.filter(
        (comment) => comment._id?.toString() !== req.params.comment_id
      );

      await post.save();
      res.status(200).json(post.comments);
    } catch {
      res.status(500).json("something went wrong !");
    }
  }
);

router.delete("/:id", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      res.status(404).json("Post not found");
      return;
    }

    if (post.userId.toString() !== req.user.id) {
      res.status(401).json(" User is not authorized to remove this post");
      return;
    }

    await postModel.deleteOne({ _id: req.params.id });
    res.status(200).json("Post is removed");
  } catch {
    res.status(500).json("something went wrong !");
  }
});

export default router;
