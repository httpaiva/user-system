//Libs:
const express = require('express');

//Functions:
const routes = express.Router();

//Controllers:
const UserController = require('./controllers/UserController');

//Routes:
routes.post('/user', UserController.create );

//Export:
module.exports = routes;