import express from "express";
import {
  createSubscription,
  getUserSubscriptions,
  updateUserPlan,
  getUserPlan,
} from "../controllers/subscription.js";

const router = express.Router();

router.post("/", createSubscription);
router.get("/plan/:userId", getUserPlan);
router.get("/:userId", getUserSubscriptions);
router.patch("/update-plan", updateUserPlan);

export default router;