const nodemailer = require('nodemailer');

require('dotenv/config');

module.exports = {
    async sendRecoveryMail(userEmail, recoveryLink) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ACCOUNT,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: `"User-system-test" <${process.env.EMAIL_ACCOUNT}>`,
            to: userEmail,
            subject: '(No-reply) Password recovery at User-system',
            text: `You have requested password recovery at User-system, please, follow the link below to choose your new password.
                ${recoveryLink}
                If you have not requested password recovery, ignore this email.`
        };

        let mailStatus = await transporter.sendMail(mailOptions);
        if (mailStatus.accepted) {
            return true;
        }
        else return false;
    }
}