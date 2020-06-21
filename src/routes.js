//Libs:
const express = require('express');

//Functions:
const routes = express.Router();
const authMiddleware = require('./utils/authMiddleware');

//Controllers:
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

//Routes:
routes.post('/user', UserController.create );
routes.get('/users', authMiddleware ,UserController.index);
routes.get('/login', SessionController.login);


//Export:
module.exports = routes;