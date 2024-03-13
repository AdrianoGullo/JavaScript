//dotenv para proteção de chave -> arquivo .env
require('dotenv').config();

const express = require('express');
const routes = require('./routes.js');       
const path = require('path');

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
const mongoStore = require('connect-mongo');
const flashMessage = require('connect-flash');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, '/public')));

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

app.set('views', path.resolve(__dirname, 'src', 'Views'));
app.set('view engine', 'ejs', )

app.use(meuMiddleware);
app.use(routes);

app.on('Conectado ao DB', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
});
