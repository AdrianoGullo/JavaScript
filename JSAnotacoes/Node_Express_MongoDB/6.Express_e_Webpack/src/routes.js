const express = require('express');
const route = express.Router();
const homeController = require('./Controllers/homeController');
const contatoController = require('./Controllers/contatoController');

//Rotas Home
route.get('/', homeController.paginaInicial);            //pag inicial vindo do homeController
route.post('/', homeController.trataPost);

route.get('/contato', contatoController.paginaInicial);

module.exports = route;