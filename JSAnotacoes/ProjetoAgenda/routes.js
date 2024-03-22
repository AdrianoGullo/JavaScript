const express = require('express');
const route = express.Router();
const homeController = require('./src/Controllers/homeController');
const loginController = require('./src/Controllers/loginController.js');
const contatoController = require('./src/Controllers/contatoController');

const loginRequired = require('./src/Middlewares/middleware.js')

route.get('/', homeController.index);  

//Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.logar);
route.get('/login/logout', loginController.logout);

//Rotas de contato
route.get('/contato/index', loginRequired.loginRequired, contatoController.index);
route.post('/contato/register', loginRequired.loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired.loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired.loginRequired, contatoController.edit);


module.exports = route;
