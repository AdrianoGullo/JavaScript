const express = require('express');
const route = express.Router();
const homeController = require('./src/Controllers/homeController');
const contatoController = require('./src/Controllers/contatoController');

//Rotas Home
//Metodo 1 (next):
/*
function meuMiddleware(requisicao, resposta, next){
    requisicao.session = {nome: 'Adriano', sobrenome: 'Gullo'};
    console.log('\nPassei no seu Middleware.');
    next();
};

route.get('/', meuMiddleware, homeController.paginaInicial, function(requisicao, resposta,next){
    console.log('\nAinda estou aqui.');
    console.log(`\nOlá ${requisicao.session.nome} ${requisicao.session.sobrenome}`);
});            //pag inicial vindo do homeController
*/

//Metodo 2 (pasta middleware):
route.get('/', homeController.paginaInicial);  


route.post('/', homeController.trataPost);
route.get('/contato', contatoController.paginaInicial);
module.exports = route;