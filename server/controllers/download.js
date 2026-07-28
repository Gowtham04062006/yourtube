import Download from "../Modals/download.js";
import Auth from "../Modals/Auth.js";
import Video from "../Modals/video.js";

export const downloadVideo = async (req, res) => {
  try {
    const { userId, videoId } = req.body;

    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const todayDownloads = await Download.countDocuments({
      user: userId,
      downloadDate: {
        $gte: start,
        $lte: end,
      },
    });

    const downloadLimits = {
      free: 1,
      bronze: 5,
      silver: 15,
      gold: Infinity,
    };

    const maxDownloads = downloadLimits[user.plan] || 1;

    if (todayDownloads >= maxDownloads) {
      return res.status(403).json({
        message:
          user.plan === "gold"
            ? "Gold users have unlimited downloads."
            : `Your ${user.plan} plan allows only ${maxDownloads} downloads per day.`,
      });
    }

    const download = await Download.create({
      user: userId,
      video: videoId,
      userPlan: user.plan,
    });

    res.status(201).json({
      message: "Download recorded successfully.",
      download,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getUserDownloads = async (req, res) => {
  try {
    const downloads = await Download.find({
      user: req.params.userId,
    })
      .populate("video")
      .sort({ createdAt: -1 });

    res.json(downloads);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};