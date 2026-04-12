// export the nodemailer module to send emails
// const express = require("express");
const nodeMailer = require("nodemailer");

const sendEmail = async (email, link) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // nodemailer format
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Link",
      html: `<p>You requested a password reset. </p>
    <p> Click the link below to reset your password:</p>
               <a href="${link}">${link}</a>`,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
