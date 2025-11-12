import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });


export const sendOtpMail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const otpMail = {
      from: `"PawPaths Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your PawPaths OTP Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>🐾 PawPaths Verification</h2>
          <p>Your OTP code is:</p>
          <h1 style="color: #2e86de;">${otp}</h1>
          <p>This code is valid for <b>5 minutes</b>.</p>
          <p>Thank you for helping save lives 💚</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(otpMail);
    console.log("✅ Mail sent:", info.response);
  } catch (error) {
    console.error("❌ Error sending mail:", error);
  }
};


