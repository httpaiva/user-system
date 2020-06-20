const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async create(request, response) {
        const { name, email, password } = request.body;

        password = await bcrypt.hash(password, 10);

        const [user_id] = await connection('users').insert({
            name,
            email,
            password
        });

        console.log(name, email, password);

        return response.json({ user_id });

    }
}