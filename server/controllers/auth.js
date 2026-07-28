import mongoose from "mongoose";
import crypto from "crypto";
import useragent from "useragent";
import geoip from "geoip-lite";
import users from "../Modals/Auth.js";
import sendOTP from "../utils/sendOtp.js";

export const login = async (req, res) => {
  const { email, name, image, deviceId } = req.body;

  try {
    const browser = useragent
      .parse(req.headers["user-agent"])
      .toString();

    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress;

    const geo = geoip.lookup(ip);

    const location = geo
      ? `${geo.city || "Unknown"}, ${geo.country}`
      : "Unknown";

    const istTime = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );

    const hour = istTime.getHours();

    const autoTheme =
      hour >= 10 && hour < 12 ? "light" : "dark";

    let existinguser = await users.findOne({ email });

    if (!existinguser) {
      existinguser = await users.create({
        email,
        name,
        image,
        theme: autoTheme,
        trustedDevices: [
          {
            deviceId,
            browser,
            ip,
            location,
          },
        ],
      });
    } else {
      existinguser.theme = autoTheme;
    }

    const otp = crypto
      .randomInt(100000, 999999)
      .toString();

    existinguser.otp = otp;
    existinguser.otpExpiry = new Date(
      Date.now() + 5 * 60 * 1000
    );

    await existinguser.save();

    await sendOTP(existinguser.email, otp);

    return res.status(200).json({
      otpRequired: true,
      email: existinguser.email,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp, deviceId } = req.body;

  try {
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        message: "OTP Expired",
      });
    }

    const browser = useragent
      .parse(req.headers["user-agent"])
      .toString();

    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress;

    const geo = geoip.lookup(ip);

    const location = geo
      ? `${geo.city || "Unknown"}, ${geo.country}`
      : "Unknown";

    const exists = user.trustedDevices.find(
      (d) => d.deviceId === deviceId
    );

    if (!exists) {
      user.trustedDevices.push({
        deviceId,
        browser,
        ip,
        location,
      });
    }

    user.otp = "";
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json({
      result: user,
      message: "OTP Verified Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateprofile = async (req, res) => {
  const { id } = req.params;
  const { channelname, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  try {
    const updatedUser = await users.findByIdAndUpdate(
      id,
      {
        $set: {
          channelname,
          description,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateTheme = async (req, res) => {
  const { id } = req.params;
  const { theme } = req.body;

  try {
    const updatedUser = await users.findByIdAndUpdate(
      id,
      {
        $set: {
          theme,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    await sendOTP(user.email, otp);

    return res.status(200).json({
      message: "OTP Sent Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
