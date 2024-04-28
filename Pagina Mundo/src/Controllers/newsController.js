exports.index = (requisicao, resposta) => {
    if(requisicao.session.user) return resposta.render('newsPag');
    return resposta.render('login');
};

