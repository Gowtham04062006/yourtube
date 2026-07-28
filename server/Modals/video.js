import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videotitle: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    filename: {
      type: String,
      required: true,
    },

    filepath: {
      type: String,
      required: true,
    },

    filetype: {
      type: String,
      required: true,
    },

    filesize: {
      type: Number,
      required: true,
    },

    videochannel: {
      type: String,
      required: true,
    },

    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("videofiles", videoSchema);