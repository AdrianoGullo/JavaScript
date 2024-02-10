const nome = 'Adriano';
const sobrenome = 'Gullo';
const idade = 25;
const nome2 = 'Guga';

//você pode criar a variavel já exportando para outros modulos
export const dia = 9;

function soma(x, y){
    return x+y;
}

export { nome, sobrenome, idade, soma, nome2 as Jogador };           //caso 'soma as default', virá a função 'soma' e mais o que escolher

export class Pessoa {               //caso 'export default class Pessoa{', ao chamar import, por padrão a função será importada
    constructor(nome, sobrenome){
        this.nome = nome;
        this.sobrenome = sobrenome;
    }
}

//Export default com arrow function
export default (a, b) => a + b;

//export default function () {} //também class, function*
//export default function funcao() {} //também class, function*
//export {name1 as default};