// export the nodemailer module to send emails

const nodeMailer = require("nodemailer");
const { getMaxListeners } = require("../models/User");

const sendEmail = async (email, link) => {
//   if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//     throw new Error("Email credentials are not configured");
//   }

  try{
    const transporter = nodeMailer.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

    // try {
    // nodemailer format
    await transporter.sendMail({
    // await transporter.verify();
    // const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Link",
      html: `<p>You requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${link}">${link}</a>`,
    });

    // console.log("Email sent successfully:", info.messageId);
    // return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    // throw new Error(error.message || "Failed to send email");
  }
};

module.exports = sendEmail;
