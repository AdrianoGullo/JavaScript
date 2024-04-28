const Login = require('../Models/loginModel');

exports.index = (requisicao, resposta) => {
    if(requisicao.session.user) return resposta.render('login-logado');
    return resposta.render('login');
};

exports.register = async(requisicao, resposta) => {
    try{
        const login = new Login(requisicao.body);
        await login.register();
    
        if(login.errors.length > 0){
            requisicao.flash('errors', login.errors);
            requisicao.session.save(function(){
                return resposta.redirect('/login/index');
            });
            return;
        }

        requisicao.flash('success', 'Usuário criado com sucesso!');
        requisicao.session.save(function(){
            return resposta.redirect('/login/index');
        });
    } catch(e){
        console.log(e);
        resposta.send('404');
    }
};

exports.logar = async(requisicao, resposta) => {
    try{
        const login = new Login(requisicao.body);
        await login.logar();
    
        if(login.errors.length > 0){
            requisicao.flash('errors', login.errors);
            requisicao.session.save(function(){
                return resposta.redirect('/login/index');
            });
            return;
        }

        requisicao.flash('success', 'Você entrou na sua conta.');
        requisicao.session.user = login.user;
        requisicao.session.save(function(){
            return resposta.redirect('/login/index');
        });
    } catch(e){
        console.log(e);
        resposta.send('404');
    }
};

exports.logout = function(requisicao, resposta){
    requisicao.session.destroy();
    resposta.redirect('/');
}