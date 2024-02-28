module.exports = function(x,y){
    return x*y;
};

//Se eu quiser usar a função dentro do arquivo:
console.log(module.exports(2,2));


module.exports = class Cachorro{
    constructor(nome){
        this.nome = nome;
    }

    latir(){
        console.log(`${this.nome} está fazendo AU AU`);
    }
};