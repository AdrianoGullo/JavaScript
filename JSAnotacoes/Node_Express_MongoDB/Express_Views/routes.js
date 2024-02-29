const express = require('express');
const route = express.Router();
const homeController = require('./Controllers/homeController');

//Rotas Home
route.get('/', homeController.paginaInicial);            //pag inicial vindo do homeController
route.post('/', homeController.trataPost);

module.exports = route;