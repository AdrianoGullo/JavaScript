const homeModel = require('../Models/homeModel');

//homeModel.create({titulo:..., data:..., objetivo:...})
//homeModel.find().then(dados => console.log(dados)).catch(e=>console.log(e));

exports.paginaInicial = (requisicao, resposta) =>{        
    requisicao.session.usuario = {nome: 'Adriano', logado: true};
//    requisicao.flash('Info', 'Mundo!'),
    console.log(requisicao.flash('Info'));
    console.log('\nRespondendo o cliente.');
    resposta.render('index.ejs');
    return;
};

exports.trataPost = (requisicao, resposta) => {
    resposta.send(requisicao.body);
    return;
};

