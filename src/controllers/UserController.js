const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const generateuuid = require('../utils/generateUUID');


module.exports = {
    async create(request, response) {
        const { name, email, password } = request.body;

        try {
            const encryptedPassword = await bcrypt.hash(password, 10);

            const user_id = await generateuuid();

            await connection('users').insert({
                id: user_id,
                name,
                email,
                password: encryptedPassword
            });

            const token = jwt.sign({user: user_id});

            return response.status(200).send({token});
        }
        catch(error){
            return response.status(400).send(error);
        }
    },
    //Exemplo de rota protegida
    async index(request, response){
        try{
            const users = await connection('users').select('*');
            return response.send({users});
        }catch(error){
            return response.status(400).send(error);
        }
    }
}