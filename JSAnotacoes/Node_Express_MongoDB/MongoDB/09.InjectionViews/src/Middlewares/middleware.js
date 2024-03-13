module.exports = (requisicao, resposta, next) => {
    if(requisicao.body.cliente){
        console.log(`\nSeja bem vindo, ${requisicao.body.cliente}`);
    }
    next();
};

exports.middlewareGlobal = (requisicao, resposta, next) =>{
    
    next();
};