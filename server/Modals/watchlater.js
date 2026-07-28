import mongoose from "mongoose";

const watchLaterSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("watchlater", watchLaterSchema);