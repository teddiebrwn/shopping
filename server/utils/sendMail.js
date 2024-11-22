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
      const resetLink = `${BASE_URL}/reset-password?${data.resetToken}`;
      subject = "Reset Your Password";
      htmlContent = `
        <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
          <h2 style="color: #007aff;">Reset Your Password</h2>
          <p style="font-size: 16px;">You requested to reset your password. Click the button below to reset it:</p>
          <a href="${resetLink}" style="display: inline-block; margin: 20px auto; padding: 10px 20px; background-color: #007aff; color: white; text-decoration: none; font-size: 16px; border-radius: 5px;">Reset Password</a>
          <p style="font-size: 14px; color: #666;">If you did not request a password reset, you can ignore this email.</p>
          <p style="font-size: 12px; color: #999;">This link is valid for 15 minutes.</p>
        </div>
      `;
    } else {
      throw new Error("Invalid email type");
    }
    const mailOptions = {
      from: `"Shopping Online Services Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendMail;
