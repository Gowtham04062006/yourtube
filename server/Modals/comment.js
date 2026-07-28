import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "videofiles",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    likes: {
      type: Number,
      default: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
    },

    reported: {
      type: Boolean,
      default: false,
    },

    reportReason: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    showLocation: {
      type: Boolean,
      default: false,
    },

    language: {
      type: String,
      default: "en",
    },
    
    location: {
      type: String,
      default: "",
    },

    showLocation: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comments", commentSchema);
