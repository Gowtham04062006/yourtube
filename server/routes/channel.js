import express from "express";
import { createChannel } from "../controllers/channel.js";

const router = express.Router();

router.post("/create", createChannel);

export default router;