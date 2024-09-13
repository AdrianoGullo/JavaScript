const express = require('express');
const route = express.Router();

//Chamando Controllers
const homeController = require('./src/Controllers/homeController');
const loginController = require('./src/Controllers/loginController.js');
const favoritosController = require('./src/Controllers/favoritosController');
const newsController = require('./src/Controllers/newsController');
const marsController = require('./src/Controllers/marsController');
const jamesWebbController = require('./src/Controllers/jamesWebbController');
const favController = require('./src/Controllers/homeIncludes/favController');



const loginRequired = require('./src/Middlewares/middleware.js')

route.get('/', homeController.index);  

//Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.logar);
route.get('/login/logout', loginController.logout);

//Rotas Mars
route.get('/mars/index', marsController.index);
route.get('/mars/search', async (req, res) => {
    let { sol, rover, page } = req.query;
    page = parseInt(page) || 1; // Se a página não for fornecida, inicia com a página 1

    if (!sol || !rover) {
        return res.render('marsPag', { dadosMars: { photos: [] }, error: 'Por favor, preencha todos os campos!', sol, rover, page });
    }

    try {
        let dadosMars = await marsController.Mars_apiRequest(rover, page, sol);
        res.render('marsPag', { dadosMars, error: null, sol, rover, page });
    } catch (error) {
        console.error(error);
        res.render('marsPag', { dadosMars: { photos: [] }, error: 'Erro ao buscar fotos. Tente novamente.', sol, rover, page });
    }
});

//Rotas pag. News
route.get('/news/index', newsController.index);

//Rota favoritos
const {Photo, UserFavorite} = require('./src/Models/homeModel.js'); // Ajuste o caminho conforme necessário
route.post('/favoritos', async (req, res) => {
    const { user_id, categoria, title, description, date, image_url } = req.body;

    try {
        // Atualizar a foto para incrementar a contagem de curtidas
        await Photo.updateOne(
        { _id: req.body.foto_id },
        { $inc: { curtidas: 1 } }
        );

        // Adicionar à lista de favoritos do usuário
        await UserFavorite.updateOne(
        { user_id: user_id },
        { $addToSet: { favoritos: { foto_id: req.body.foto_id, categoria, title, description, date, image_url } } },
        { upsert: true }
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao favoritar a foto:', error);
        res.status(500).json({ success: false, message: 'Erro ao favoritar a foto.' });
    }
});

//JamesWebb rotas
route.get('/jameswebb', jamesWebbController.index);

module.exports = route;
