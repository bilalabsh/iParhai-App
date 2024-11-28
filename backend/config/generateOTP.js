const nodemailer = require("nodemailer");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fasttale21k@gmail.com", // Replace with your Gmail email
    pass: "qrhj rbdq lxry ieyn", // Replace with your Gmail password
  },
});

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: "memonbilal162@gmail.com", // Replace with your Gmail email
    to: email,
    subject: "Your OTP for Registration",
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

module.exports = { generateOTP, sendOTP };