//dotenv para proteção de chave -> arquivo .env
//Variavéis de ambiente
require('dotenv').config();

//Require para pegar 'pacotes'
const express = require('express');
const routes = require('./routes.js');          //rota da aplicação 
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');

//Middlaware e Mongoose
const meuMiddleware = require('./src/Middlewares/middleware.js');
const { default: mongoose } = require('mongoose');
const app = express();

//Conexão ao banco de dados antes de continuar as requisições.
mongoose.connect(process.env.connectionSting)
    .then(()=>{
        console.log("\nConectado a BS.");
        app.emit("Conectado ao DB");
    })
    .catch(e => console.log(e));

//Para Express Session e Flash Message após conecttado a DB.
const session = require('express-session');
const mongoStore = require('connect-mongo');    //toda sessao é salva dentro do DB
const flashMessage = require('connect-flash');  //mensagem autodestrutiva: aparece e some, salvas na sessao

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public'))); //acessar arquivos estaticos de /public, como css, bundle.js
app.use(helmet());

//Configurações de sessão
const sessionOptions = session({
    secret: 'hojedeveserdia',
    store: new mongoStore({mongoUrl: process.env.connectionSting}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24,
        httpOnly: true,
    }
});
app.use(sessionOptions);
app.use(flashMessage());

//Arquivos renderizados na tela, geralmente HTML
app.set('views', path.resolve(__dirname, 'src', 'Views'));
//Usa engine para renderizar arquivos .ejs
app.set('view engine', 'ejs', )

//CSRF Token - configurando código de segurança
app.use(csrf());

//Utilização dos Middlewares
app.use(meuMiddleware.middlewareGlobal);
app.use(meuMiddleware.checkCSRF);
app.use(meuMiddleware.csrfMiddleware);
app.use(routes);    //chamando as rotas


app.on('Conectado ao DB', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
});
