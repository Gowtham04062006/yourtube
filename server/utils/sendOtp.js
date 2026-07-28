import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "YourTube Login Verification",
    html: `
      <h2>YourTube Login Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    `,
  });
};

export default sendOTP;
