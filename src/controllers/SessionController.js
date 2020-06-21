const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

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
                const token = jwt.sign({user: user.id});

                return response.status(200).send({user, token});
            } else {
                return response.status(401).send({error, message: 'Wrong password'});
            } 
        });
    }
}