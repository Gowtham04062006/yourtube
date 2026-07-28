import Channel from "../Modals/channel.js";

export const createChannel = async (req, res) => {
  try {
    const channel = await Channel.create(req.body);

    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};