const nome = "Adriano";
const sobrenome = "Gullo";

const falaNome = () => nome + ' ' +sobrenome;


module.exports.nome = nome;
module.exports.sobrenome = sobrenome;
module.exports.falaNome = falaNome;

//console.log(module.exports);

//De forma abreviada do exports acima:
exports.nome = nome;
exports.sobrenome = sobrenome;
exports.falaNome = falaNome;
this.qualquerCoisa = 'O que eu quiser';         //o "this" referencia o exports ou module.exports

console.log('Exports:', exports);


//Criando uma classe construtora para exports
class Pessoa{
    constructor(nome){
        this.nome = nome;
    }
}

exports.Pessoa = Pessoa;

//Outra forma de export    -> para usar:   const {Pessoa} = require('./mod1');     ->   const p1 = new Pessoa('Junior');   -> console.log(p1);
module.exports = {
    nome, sobrenome, Pessoa
};