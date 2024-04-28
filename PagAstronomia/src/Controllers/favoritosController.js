exports.index = (requisicao, resposta) => {
    if(requisicao.session.user) return resposta.render('favoritosPag');
    return resposta.render('login');
};

