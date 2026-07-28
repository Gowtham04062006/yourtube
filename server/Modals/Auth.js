import mongoose from "mongoose";

const authSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  channelname: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },

  plan: {
    type: String,
    enum: ["free", "bronze", "silver", "gold"],
    default: "free",
  },

  theme: {
    type: String,
    enum: ["light", "dark"],
    default: "dark",
  },

  trustedDevices: [
    {
      deviceId: {
        type: String,
      },
      browser: {
        type: String,
      },
      ip: {
        type: String,
      },
      location: {
        type: String,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  otp: {
    type: String,
    default: "",
  },

  otpExpiry: {
    type: Date,
  },
});

export default mongoose.model("users", authSchema);