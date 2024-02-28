const mod1 = require("./mod1");
console.log('"mod1 = require":' + mod1.falaNome);          //ou const falaNome = mod1.falaNome e dps console.log(falaNome());

const { nome, sobrenome, falaNome } = require('./mod1');      //outra forma de obter os dados
console.log('"nome, sobrenome, falaNome = require":', nome, sobrenome, falaNome);

const { Pessoa } = require('./mod1');           //obtendo classe
const p1 = new Pessoa('Luiz');
console.log('P1:', p1);

/////////////////////////////////
//Para o mod2:

const n = require('./mod2');
console.log(n);

const Cachorro = require('./mod2');
const dog1 = new Cachorro('Tobias');
console.log(dog1);
dog1.latir();