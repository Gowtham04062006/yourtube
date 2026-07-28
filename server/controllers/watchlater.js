import WatchLater from "../Modals/watchlater.js";

export const saveWatchLater = async (req, res) => {
  try {
    const { user, video } = req.body;

    const alreadyExists = await WatchLater.findOne({
      user,
      video,
    });

    if (alreadyExists) {
      return res.status(400).json({
        message: "Video already added to Watch Later",
      });
    }

    const watchLater = new WatchLater({
      user,
      video,
    });

    await watchLater.save();

    return res.status(201).json({
      message: "Added to Watch Later",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getWatchLater = async (req, res) => {
  try {
    const { userId } = req.params;

    const videos = await WatchLater.find({
      user: userId,
    }).populate("video");

    return res.status(200).json(videos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};