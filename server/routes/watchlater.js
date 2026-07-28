import express from "express";
import {
  saveWatchLater,
  getWatchLater,
} from "../controllers/watchlater.js";

const router = express.Router();

router.post("/", saveWatchLater);

router.get("/:userId", getWatchLater);

export default router;