const connection = require('../database/connection');

module.exports = {
    async create (request, response) {
        const { name, email, password } = request.body;

        const [user_id] = await connection('users').insert({
            name,
            email,
            password
        });

        console.log(name, email, password);
        
        return response.json({ user_id });
    
    }
}