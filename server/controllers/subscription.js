import Subscription from "../Modals/subscription.js";
import Auth from "../Modals/Auth.js";

export const createSubscription = async (req, res) => {
  try {
    const { userId, plan, amount } = req.body;

    const user = await Auth.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const subscription = await Subscription.create({
      user: userId,
      plan,
      amount,
      status: "pending",
    });

    res.status(201).json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getUserSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateUserPlan = async (req, res) => {
  try {
    const { userId, plan } = req.body;

    const user = await Auth.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.plan = plan;
    await user.save();

    res.status(200).json({
      message: "Plan updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getUserPlan = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      plan: user.plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};