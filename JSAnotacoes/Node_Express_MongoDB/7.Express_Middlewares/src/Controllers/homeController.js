//Metodo 1 (next):
/*
exports.paginaInicial = (requisicao, resposta, next) =>{          //pag inicial com formulatio, pegando o texto por "nome"
    console.log('\nRespondendo o cliente.');
    resposta.render('index.ejs');
    next();
};

exports.trataPost = (requisicao, resposta, next) => {
    resposta.send("Ei, nova rota de post");
};*/

//Metodo 2:
exports.paginaInicial = (requisicao, resposta) =>{          //pag inicial com formulatio, pegando o texto por "nome"
    console.log('\nRespondendo o cliente.');
    resposta.render('index.ejs');
    return;
};

exports.trataPost = (requisicao, resposta) => {
    resposta.send(requisicao.body);
    return;
};