// Minimal email helper. If SMTP is configured via env vars, use nodemailer; otherwise fallback to console.
const nodemailer = require('nodemailer');

let transporter = null;
if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

const sendEmail = async (to, subject, text, html) => {
  if (!transporter) {
    console.log('Email fallback. To:', to, 'Subject:', subject, 'Text:', text);
    return;
  }
  await transporter.sendMail({ from: process.env.EMAIL_FROM || process.env.EMAIL_USER, to, subject, text, html });
};

module.exports = { sendEmail };
