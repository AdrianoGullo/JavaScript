exports.middlewareGlobal = (requisicao, resposta, next) =>{
    resposta.locals.errors = requisicao.flash('errors');
    resposta.locals.success = requisicao.flash('success');
    resposta.locals.user = requisicao.session.user;
    next();
};

// Protejer dados de erro CSRF para não ser visível externamente
exports.checkCSRF= (err, requisicao, resposta, next) => {
    if(err && 'EBADCSRFTOKEN' === err.code){
        return resposta.render('404');
    };
    next();
};

exports.csrfMiddleware = (requisicao, resposta, next) => {
    resposta.locals.csrfToken = requisicao.csrfToken();
    next();
}