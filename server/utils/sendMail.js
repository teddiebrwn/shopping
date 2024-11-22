const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * Function to send emails based on the type (e.g., verification, password reset).
 * @param {string} to - Recipient email address.
 * @param {string} type - Type of email (e.g., "verification", "passwordReset").
 * @param {Object} data - Data to populate the email (e.g., verification code, reset link).
 */
const sendMail = async (to, type, data) => {
  try {
    // Create transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Email sender
        pass: process.env.EMAIL_PASS, // Email password
      },
    });

    let subject, htmlContent;

    // Email content based on the type
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

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender address
      to, // Recipient address
      subject, // Subject line
      html: htmlContent, // HTML body content
    });

    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendMail;
