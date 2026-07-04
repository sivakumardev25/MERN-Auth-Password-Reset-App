// Email sending helper with provider fallback (SendGrid Web API preferred)

const nodeMailer = require("nodemailer");

const sendEmail = async (email, link) => {
  try {
    // Prefer SendGrid Web API when API key is provided
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: email,
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        subject: "Password Reset Link",
        html: `<p>You requested a password reset.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${link}">${link}</a>`,
      };

      const res = await sgMail.send(msg);
      console.log("SendGrid send response:", Array.isArray(res) ? res[0].statusCode : res.statusCode);
      return res;
    }

    // Otherwise fall back to SMTP providers (SendGrid SMTP or Gmail)
    let transporter;
    if (process.env.SENDGRID_SMTP_USER && process.env.SENDGRID_SMTP_PASS) {
      transporter = nodeMailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        secure: false,
        auth: {
          user: process.env.SENDGRID_SMTP_USER,
          pass: process.env.SENDGRID_SMTP_PASS,
        },
      });
    } else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      throw new Error("No email provider configured. Set SENDGRID_API_KEY or SMTP/GMAIL creds.");
    }

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Link",
      html: `<p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${link}">${link}</a>`,
    });

    console.log("SMTP send response:", info && info.messageId ? info.messageId : info);
    return info;
  } catch (error) {
    console.error("Failed to send email:", error && error.message ? error.message : error);
    throw error;
  }
};

module.exports = sendEmail;
