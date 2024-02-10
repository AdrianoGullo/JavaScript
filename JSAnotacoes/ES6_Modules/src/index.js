alert('Olá Mundo!');

const nome = 'Paulo';           //caso vá importar uma variavel 'nome' mas já estiver sendo usado no código, 'import {nome as nome2}'

import {nome as nome2, sobrenome, idade, soma, Jogador, dia, Pessoa} from './modulo1';

console.log(nome2, sobrenome, idade);
console.log(soma(10, 11));
console.log(nome);
console.log(Jogador, dia);

const p1 = new Pessoa('Joao', 'Pedro');
console.log(p1);