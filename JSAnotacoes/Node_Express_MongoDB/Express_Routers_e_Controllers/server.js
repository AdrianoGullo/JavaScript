const express = require('express');
const app = express();
const routes = require('./routes');         //pegando arquivo específico para rotar

// CRUD -> CREATE, READ, UPDATE, DELETE
//          POST    GET   PUT    DELETE

//http://meusite.com/  <- GET -> Entregue a página /
//http://meusite.com/sobre  <- GET -> Entregue a página /sobre
//http://meusite.com/contato  <- GET -> Entregue a página /contato

// .params -> rotas da URL
// .query  -> URL com novas solicitações: /profiles/?nome=Adriano&sobrenome=Gullo&idade=25
// .body   -> 

app.use(                    //usado para tratar o body das requisições
    express.urlencoded(
        {extended: true}
    )
);

app.use(routes);

app.get('/testes/:idUsuarios?/:parametro?', (requisicao, resposta) => {
    console.log(requisicao.params);
    console.log(requisicao.query);
    resposta.send(requisicao.params);
});

app.get('/contato', (requisicao, resposta) => {     //ramos da pag inicial
    resposta.send('Obrigado por entrar em contato com a Gullo Simulations');
});

app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
});

//Para executar o servidor com nodemon e não precisar fechar e abrir o servidor para toda alteração:
    // Instalar na pasta: npm install nodemon --save-dev
    // Executar: npx nodemon server.js   -> ou alterar no arquivo json o script "start"
    // Reiniciar o servidor por nodemon: rs


// Express: - req.params, req.query e req.body
    //ex parametros de URL: http://site.com/profiles/12345?campanha=googleads&nome_campanha=propaganda
    // /profiles/12345?
    // campanha=googleads &
    // nome_campanha=propaganda

    //Para resposta.send(requisicao.params), irá mostar o json, caso resposta.send(requisicao.params.idUsuario) mostra apenas o id e assim por diante;

// Idealmente, as rotas ficam todas no arquivo routes.js. Nesse arquivo, algumas serão deixadas aqui por motivos de compreensão e aprendizado
// Você pode entender como usar as rotas em um arquivo separado (routes.js) com alguns exemplos que lá estão
