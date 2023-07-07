const nodemailer = require('nodemailer');
const config = process.env

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: config.EMAIL_USER ,
      pass: config.EMAIL_PASS ,
    },
  });    
const mailOption =(user,subject,message)=> {
  return {
    from: config.EMAIL_USER,
    to: user.email,
    subject: subject,
    text: message
  };
}

const sendMail=async(user,subject, message)=>{
    try{
      const info = await transporter.sendMail(mailOption(user,subject,message));
      return info.messageId;
    } catch (e) {
      return null
    }
}
module.exports = sendMail;