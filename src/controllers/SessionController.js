const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async login(request, response) {
        const [hashType, hash] = request.headers.authorization.split(' ');
        // Decrypting the hash generated in header:
        const [email, password] = Buffer.from(hash, 'base64').toString().split(':');
        let user;

        try{
            [user] = await connection('users').where('email', email).select('*');
        }
        catch(error){
            return response.status(400).send(error, "Could not connect to database.");
        }

        if (!user) {
            return response.status(404).send({message:"Could not find email."});
        }

        bcrypt.compare(password, user.password, function(error, same) {
            if(same) {
                return response.json(user);
            } else {
                return response.status(401).send({message: 'Wrong password'});
            } 
        });
    }
}