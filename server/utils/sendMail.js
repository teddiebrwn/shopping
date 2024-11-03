const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, clientUrl) => {
  try {
    // const verificationLink = `${clientUrl}/homepage`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Xác thực tài khoản của bạn",
      html: `
        <div style="text-align: center;">
          <h1 style="color: Black;">✨Welcome to Shopping Online✨</h1>
          <div style="border: 2px solid #a6a6a6; padding: 20px; border-radius: 10px;">
            <p style="color: #a6a6a6;">Chào mừng bạn đến với Shopping Online!</p>
            <p style="color: #a6a6a6;">Nhấn vào liên kết bên dưới để xác thực tài khoản của bạn.</p>
            <a href="${verificationLink}" style="color: black; font-weight: bold;">Xác thực tài khoản</a>
            <p style="color: #a6a6a6;">Liên kết này có hiệu lực trong 1 giờ.</p>
            <h4 style="color: #a6a6a6;">Shopping Online Services Team 🚀</h4>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Lỗi gửi email. Vui lòng thử lại sau.");
  }
};

module.exports = sendVerificationEmail;
