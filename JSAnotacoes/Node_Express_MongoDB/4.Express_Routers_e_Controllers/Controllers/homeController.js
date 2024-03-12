exports.paginaInicial = (requisicao, resposta) =>{          //pag inicial com formulatio, pegando o texto por "nome"
    resposta.send('<form action="/" method="POST"> Solicitação: <input type="text" name="nome"> <button>Enviar pedido</button> </form>');
};

exports.trataPost = (requisicao, resposta) => {
    console.log(requisicao.body);
    resposta.send(`Mensagem Recebida: ${requisicao.body.nome}`);
};