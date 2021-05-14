const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email.user, 
      pass: config.email.password 
    }
  });

// const mailOptions = {
//     from: 'sender@hotmail.com',               
//     to: 'receiver@hotmail.com',               
//     subject: 'Hello from sender',              
//     html: '<b>Do you receive this mail?</b>'   
// };

const sendEmail = (opt) => {
    transporter.sendMail(opt, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    });
}

module.exports = { sendEmail }