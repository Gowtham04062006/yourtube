import express from "express";
import upload from "../filehelper/filehelper.js";

import {
  uploadVideo,
  getAllVideos,
  getVideoById,
  likeVideo,
  dislikeVideo,
} from "../controllers/video.js";

const router = express.Router();
router.post(
  "/upload",
  upload.single("video"),
  uploadVideo
);

router.get("/", getAllVideos);

router.get("/:id", getVideoById);

router.patch("/like/:id", likeVideo);

router.patch("/dislike/:id", dislikeVideo);

export default router;
