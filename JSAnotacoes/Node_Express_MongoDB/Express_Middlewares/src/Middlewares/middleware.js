module.exports = (requisicao, resposta, next) => {
    if(requisicao.body.cliente){
        console.log(`\nSeja bem vindo, ${requisicao.body.cliente}`);
    }
    next();
};

exports.middlewareGlobal = (requisicao, resposta, next) =>{
    next();
};

exports.middlewareGlobal2 = (requisicao, resposta, next) =>{
    console.log('\nSou o 2.')
    next();
};