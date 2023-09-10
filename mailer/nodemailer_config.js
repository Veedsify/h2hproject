const nodemailer = require('nodemailer')
const { MAIL_HOST,
    MAIL_USER,
    MAIL_PASS,
    MAIL_PORT, } = process.env

const MailTransport = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
})


module.exports = { MailTransport }

