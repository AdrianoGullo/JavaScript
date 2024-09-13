const { response } = require("express");

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
};

exports.loginRequired = (requisicao, resposta, next) =>{
    if(!requisicao.session.user){
        requisicao.flash('errors', 'Você precisa fazer login');
        requisicao.session.save(() => resposta.redirect('/'));
        return;
    }
    next();
};

exports.checkAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.flash('errors', 'Acesso negado');
    }
};