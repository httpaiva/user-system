const connection = require('../database/connection');
const jwt = require('../utils/jwt');
const sendMail = require('../utils/sendMail');
const bcrypt = require('bcrypt');

require('dotenv/config');

module.exports = {
    async requestNewPassword(request, response) {
        const { userEmail } = request.body;

        try {
            const data = await connection('users').where('email', userEmail).select('email', 'id').first();

            if (!data) {
                return response.status(400).send('This email is not valid!');
            }

            const userId = data.id;

            const resetToken = jwt.forgetPasswordToken({ user: userId });
            const resetPasswordLink = `http://${process.env.FRONTEND_LINK || 'localhost:3000'}/forgotpassword/${resetToken}`;

            emailStatus = sendMail.sendRecoveryMail(userEmail, resetPasswordLink);
            
            if(!emailStatus){
                return response.status(400).send('Could not send email');
            }
            else{
                return response.status(200).send('Email successfully sent!');
            }
        }
        catch (error) {
            return response.status(400).send(error);
        }
    },

    async createNewPassword(request, response) {
        const [, token] = request.headers.authorization.split(' ');
        const { newPassword } = request.body;


        try {
            const payload = await jwt.verify(token);
            const encryptedPassword = await bcrypt.hash(newPassword, 10);

            const [user] = await connection('users').where('id', payload.user).select('*');

            if (!user) {
                response.status(404).send('User not found!');
            }

            await connection('users').where('id', payload.user).update({ password: encryptedPassword });

            response.status(200).send('Password successfully changed!');

        } catch (error) {
            response.status(400).send(error);
        }
    }
}