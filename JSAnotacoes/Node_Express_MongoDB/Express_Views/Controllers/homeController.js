exports.paginaInicial = (requisicao, resposta) =>{          //pag inicial com formulatio, pegando o texto por "nome"
    resposta.render('index');
};

exports.trataPost = (requisicao, resposta) => {
    resposta.send("Ei, nova rota de post");
};