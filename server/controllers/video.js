import Video from "../Modals/video.js";

export const uploadVideo = async (req, res) => {
  if (req.file == undefined) {
    return res.status(404).json({
      message: "Please upload a mp4 video file only",
    });
  }

  try {
    console.log("Saving filepath:", `uploads/${req.file.filename}`);

    const file = new Video({
      videotitle: req.body.videotitle,
      filename: req.file.originalname,
      description: req.body.description,
      filepath: `uploads/${req.file.filename}`,
      filetype: req.file.mimetype,
      filesize: req.file.size,
      videochannel: req.body.videochannel,
      uploader: req.body.uploader,
    });

    await file.save();

    return res.status(201).json({
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(videos);
  } catch (error) {
    console.error("Fetch Videos Error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    return res.status(200).json(video);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    video.like += 1;

    await video.save();

    return res.status(200).json(video);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    video.dislike += 1;

    await video.save();

    return res.status(200).json(video);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
