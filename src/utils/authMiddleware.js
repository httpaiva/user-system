const jwt = require('./jwt');
const connection = require('../database/connection');

const authMiddleware = async (request, response, next) => {
  const [, token] = request.headers.authorization.split(' ');

  try{
    const payload = await jwt.verify(token);
    [user] = await connection('users').where('id', payload.user).select('*');

    if(!user){
      response.status(401).send(error);
    }
    next();
  }catch(error){
    response.status(400).send(error);
  }
}

module.exports = authMiddleware;