exports.index = (requisicao, resposta) => {
    if(requisicao.session.user) return resposta.render('eventsPag');
    return resposta.render('login');
};

