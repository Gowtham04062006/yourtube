import Comment from "../Modals/comment.js";

const abusiveWords = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "idiot",
  "stupid",
];

const containsAbusiveWord = (text) => {
  const lower = text.toLowerCase();
  return abusiveWords.some((word) => lower.includes(word));
};

const hasRepeatedSpecialCharacters = (text) => {
  return /([!@#$%^&*()_+=\-{}[\]|\\:;"'<>,.?/~`])\1{4,}/.test(text);
};

export const addComment = async (req, res) => {
  try {
    const {
      user,
      video,
      message,
      location,
      showLocation,
      language,
    } = req.body;

    if (!message.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty.",
      });
    }

    if (containsAbusiveWord(message)) {
      return res.status(400).json({
        message: "Comment contains abusive language.",
      });
    }

    if (hasRepeatedSpecialCharacters(message)) {
      return res.status(400).json({
        message: "Comment contains invalid characters.",
      });
    }

    const spam = await Comment.findOne({
      user,
      video,
      message,
    });

    if (spam) {
      return res.status(400).json({
        message: "Duplicate comment detected.",
      });
    }

    const newComment = new Comment({
      user,
      video,
      message,
      location,
      showLocation,
      language,
    });

    await newComment.save();

    const savedComment = await Comment.findById(newComment._id).populate(
      "user"
    );

    return res.status(201).json({
      message: "Comment added successfully",
      comment: savedComment,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Comment.find({
      video: videoId,
    })
      .populate("user")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    comment.likes += 1;

    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const dislikeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    comment.dislikes += 1;

    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const reportComment = async (req, res) => {
  try {
    const { reason } = req.body;

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    comment.reported = true;
    comment.reportReason = reason || "Reported by user";

    await comment.save();

    return res.status(200).json({
      message: "Comment reported successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const translateComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const translations = {
      "hola": "Hello",
      "hola amigo": "Hello friend",
      "gracias": "Thank you",
      "adios": "Goodbye",
      "buenos dias": "Good morning",
      "buenas noches": "Good night",
      "como estas": "How are you?",
      "bonjour": "Hello",
      "merci": "Thank you",
      "au revoir": "Goodbye",
      "ciao": "Hello",
      "arrivederci": "Goodbye",
      "namaste": "Hello",
      "नमस्ते": "Hello",
      "धन्यवाद": "Thank you",
      "வணக்கம்": "Hello",
      "ありがとう": "Thank you",
      "こんにちは": "Hello",
      "你好": "Hello",
      "谢谢": "Thank you",
      "안녕하세요": "Hello",
      "감사합니다": "Thank you"
    };

    const original = comment.message.trim().toLowerCase();

    const translated =
      translations[original] ||
      "Translation not available for this sentence.";

    return res.status(200).json({
      original: comment.message,
      translated,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Translation failed",
    });
  }
};