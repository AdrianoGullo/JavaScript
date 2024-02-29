const express = require('express');
const app = express();
const routes = require('./routes');       
const path = require('path');

app.use(                    //usado para tratar o body das requisições
    express.urlencoded(
        {extended: true}
    )
);

app.set('Views', path.resolve(__dirname, 'Express_Views', 'Views'));
app.set('view engine', 'ejs', )

app.use(routes);

app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
});