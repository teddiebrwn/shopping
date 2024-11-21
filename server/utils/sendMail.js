//custom form

const nodemailer = require("nodemailer");
const sendMail = async (to, type, data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    let subject, text;
    if (type === "verification") {
      subject = "Your Verification Code";
      text = `Your verification code is ${data.code}. It will expire in 15 minutes.`;
    } else if (type === "passwordReset") {
      const resetLink = `https://your-app.com/reset-password?token=${data.resetToken}`;
      subject = "Password Reset Request";
      text = `You requested to reset your password. Use the following link or token to reset your password:\n\nLink: ${resetLink}\nToken: ${data.resetToken}\n\nThe link is valid for 15 minutes.`;
    } else {
      throw new Error("Invalid email type");
    }
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
module.exports = sendMail;
