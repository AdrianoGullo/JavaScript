exports.middlewareGlobal = (requisicao, resposta, next) =>{
    resposta.locals.umaVariavel = 'Esta é uma variavel.'
    next();
};

// Protejer dados de erro CSRF para não ser visível externamente
exports.checkCSRF= (err, requisicao, resposta, next) => {
    if(err && 'EBADCSRFTOKEN' === err.code){
        return resposta.render('404');
    };
};

exports.csrfMiddleware = (requisicao, resposta, next) => {
    resposta.locals.csrfToken = requisicao.csrfToken();
    next();
}