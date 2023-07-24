const nodemailer = require('nodemailer');
const email=process.env.EMAIL;
const pass=process.env.EMAILPASSWORD;

const sendEmail = async (to, subject, html) => {
  try {
    // Create a transport object using SMTP
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: email,
        pass: pass
      }
    });

    // Send the email
    const mailOptions = {
      from: email,
      to,
      subject,
      html
    };

    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
