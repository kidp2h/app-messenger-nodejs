import nodemailer from "nodemailer"

const usernameMail = process.env.MAIL_USERNAME
const passwordMail = process.env.MAIL_PASSWORD
const hostMail = process.env.MAIL_HOST
const portMail = process.env.MAIL_PORT



let sendMailUser =  async (to, subject,htmlContent) => {
    let transporter = nodemailer.createTransport({
        host: hostMail,
        port: portMail,
        secure: false, // true for 465, false for other ports
        auth: {
          user: usernameMail, // generated ethereal user
          pass: passwordMail // generated ethereal password
        }
      });
    
      // send mail with defined transport object
    let result = await transporter.sendMail(
        {
        to: to, // list of receivers
        subject: subject, // Subject line
        html: htmlContent // html body})
})
return result
}
module.exports = sendMailUser;
  