const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // Corrected host variable
  port: Number(process.env.EMAIL_PORT), // Ensure it's a number
  secure: process.env.EMAIL_SECURE === "true", // Convert to boolean
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Email not sent!", error);
  }
};

module.exports = sendEmail;