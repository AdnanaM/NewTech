let nodemailer = require('nodemailer');
let config = require('../config');
const sendEmail = async options => {
    console.log(options);
    let transporter = nodemailer.createTransport({
        host: config.EMAIL_HOST,
        port: config.EMAIL_PORT,
        auth:{
            user: config.EMAIL_USERNAME,
            pass: config.EMAIL_PASSWORD       
        }   
    })
    const mailOptions = {
        from: '<test mail>no-reply',
        to: options.email,
        subject: options.subject,
        text: options.message   
    }
    await transporter.sendMail(mailOptions)
}
module.exports = sendEmail
