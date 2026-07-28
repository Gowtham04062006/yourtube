import express from "express";
import {
  addComment,
  getComments,
  likeComment,
  dislikeComment,
  reportComment,
  translateComment,
} from "../controllers/comment.js";

const router = express.Router();

router.post("/", addComment);

router.get("/:videoId", getComments);

router.patch("/like/:id", likeComment);

router.patch("/dislike/:id", dislikeComment);

router.patch("/report/:id", reportComment);

router.post("/translate/:id", translateComment);

export default router;