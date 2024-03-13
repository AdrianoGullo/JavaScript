const homeModel = require('../Models/homeModel');

exports.paginaInicial = (requisicao, resposta) =>{        
    resposta.render('index.ejs', {
        titulo: 'Titulo da <span style="color: red;">página</span>',
        numeros: [0,1,2,3,4,5,6,7],
    });
    return;
};

exports.trataPost = (requisicao, resposta) => {
    resposta.send(requisicao.body);
    return;
};

