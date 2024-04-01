const Contato = require('../Models/contatoModel');


exports.index = async (requisicao, resposta) =>{   
    const contatos = await Contato.buscaContatos();     
    resposta.render('index.ejs', {contatos});
    return;
};

