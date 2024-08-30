const express = require('express');
const route = express.Router();

//Chamando Controllers
const homeController = require('./src/Controllers/homeController');
const loginController = require('./src/Controllers/loginController.js');
const favoritosController = require('./src/Controllers/favoritosController');
const newsController = require('./src/Controllers/newsController');
const marsController = require('./src/Controllers/marsController');

const loginRequired = require('./src/Middlewares/middleware.js')

route.get('/', homeController.index);  

//Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.logar);
route.get('/login/logout', loginController.logout);

//Rotas Highligths
route.get('/mars/index', marsController.index);

//Rotas pag. favoritos
route.get('/fav/index', favoritosController.index);

//Rotas pag. News
route.get('/news/index', newsController.index);

module.exports = route;
