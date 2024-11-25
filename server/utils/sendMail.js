const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (to, type, data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let subject, htmlContent;

    if (type === "verification") {
      subject = "Your Verification Code";
      htmlContent = `
        <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
          <h2 style="color: #007aff;">Your Verification Code</h2>
          <p style="font-size: 16px;">Your verification code is:</p>
          <p style="font-size: 24px; font-weight: bold; color: #007aff;">${data.code}</p>
          <p style="font-size: 14px; color: #666;">This code will expire in 15 minutes.</p>
        </div>
      `;
    } else if (type === "passwordReset") {
      const BASE_URL = process.env.BASE_URL;
      const resetLink = `${BASE_URL}/reset-password/${data.token}`;
      subject = "Reset Your Password";
      htmlContent = `
        <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
          <h2 style="color: #007aff;">Password Reset Request</h2>
          <p style="font-size: 16px;">You have requested to reset your password.</p>
          <p style="font-size: 14px;">Click the link below to reset your password:</p>
          <a href="${resetLink}" style="font-size: 16px; color: #007aff;">Reset Password</a>
          <p style="font-size: 14px; color: #666;">If you did not request this, you can ignore this email.</p>
        </div>
      `;
    } else {
      throw new Error("Invalid email type provided");
    }
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    });

    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendMail;
