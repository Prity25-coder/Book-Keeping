import { createTransport } from "nodemailer";
import ENV_CONFIG from "../config/env.config.js"


const { emailUser, emailPass } =  ENV_CONFIG;

const sendEmail = async (emailId, subject, text) => {
  // Create email transporter
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  // Configure email options
  const mailOptions = {
    from: "magician codingninjas2k16@gmail.com",
    to: emailId,
    subject: subject,
    text: text, // for plain txt
    // html: body, // for html
  };

  // Send the email
  try {
    const emailRes = await transporter.sendMail(mailOptions);
    console.log(`email SENT successfully! to ${emailId}`);
    return emailRes;
  } catch (error) {
    console.log("Email send failed with error: ", error);
  }
};

export default sendEmail;