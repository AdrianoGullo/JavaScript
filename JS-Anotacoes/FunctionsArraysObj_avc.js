//Curso JavaScript e TypeScript//
//----------ANOTAÇÕES-2--------//

//JavaScript - Funções (Avançado):

    /*//Declaração: 
    //Function hoisting (posso criar ela dps de chamar)
    function Ola(){ 
        console.log('Olá.');
    }

    //First-Class objects = atribuir uma função a uma variável
    const umDado = function(){
        console.log('sou um Dado.');
    }
    umDado();

    //Arrow Function
    const funcaoArrow = () => {
        console.log('Sou uma função arrow.');
    }
    funcaoArrow();

    //Dentro de um objeto:
    const objeto = {
        falar: function(){                      //ou falar(){.....}
            console.log('Estou falando.');
        },
        nome: 'Pá'
    };
    objeto.falar();
    */

    /*//Parâmetros de Função:
        function argumento(){
            console.log(arguments[10]);
        }
        argumento(1,2,3,4,5,6,7,8,9, 'Adriano');        //vai retornar o argumento 10 = Adriano
        //
        //
        function paraObjeto({nome, idade, altura}){
            console.log(nome, idade, altura);
        }
        paraObjeto({nome:'Adriano', idade:24, altura:1.74});
        //
        //
        function paraArrays([nome, idade, altura]){
            console.log(nome, idade, altura);
        }
        paraArrays(['Adriano', 24, 1.74]);
        //
        //
        function somaResto (operador, acumulador, ...numeros){      
            for(let numero of numeros){
                if(operador === '+') acumulador+=numero;
            }
            console.log(acumulador);
        }
        somaResto('+', 2, 41, 56, 84);      //...numeros faz pegar todos os valores dps do acumulador forem colocados
        */

    /*//Closures:
    function retornaFuncao(){
        const nome = 'Gullo';
        return function(){
            return nome;
        }
    }
    const retorna = retornaFuncao();
    console.dir(retorna);           //função anonima no console, retorna a função e seus acessos aos parentes
    */

    /*//Funções CallBacks:
    function f1(callback){
        setTimeout(function(){
            console.log('f1');
            if(callback) callback();
        }, 1000);                   
    }                               
    function f2(callback){              //sem o parâmetro callback, apenas com timeout eu
        setTimeout(function(){          //consigo controlar quando cada função ser executado em tempo
            console.log('f2');          //fazendo com que a prioridade de linha escrita seja desfeita
            if(callback) callback();    //assim, rodaria: f2, f3, f1
        }, 500);                        
    }
    function f3(callback){
        setTimeout(function(){
            console.log('f3');
            if(callback) callback();
        }, 800);
    }                     
    f1();
    f2();
    f3();
    //Se eu chamar as funções como abaixo, eu consigo reorganizar as prioridades:
    f1(function(){              //assim, a função começa com f1 e termina no escopo da f3 independente do tempo
        f2(function(){          
            f3(function(){
                console.log('Olá Mundo');
            });
        });
    });
    */

    /*//IIFE -> Immediately Invoked Function Expression (função executada ao criar):
    (function(){                    //função protegida do escopo global
        const nome = 'Luiz';
        console.log(nome);          //iniciaria o programa com o nome=Luiz e printaria
    })();
    const nome = 'Gullo';           //pode ser definida a variavel com o mesmo nome
    console.log(nome);              //aqui sairia Gullo

    (function(idade, peso){         
        const nome = 'Luiz';
        console.log(nome + '-' + 'idade:' + idade + '-' + 'peso:' + peso);          
    })(24, 67); //passando parâmetros
    */

    /*//Factory Functions (Funções Fábrica):
    function criaPessoa(nome, sobrenome, altura, peso){
        return{
            nome,
            sobrenome,
            nomeCompleto(){
                return `${this.nome} ${this.sobrenome}`;
            },
            //Método normal
            fala(assunto){
                return `${this.nome} está ${assunto}`;
            },
            altura,
            peso,
            //Getter
            get imc(){                                      //sem 'get', deve ser chamado como imc();                            
                const indice = this.peso/(this.altura**2);
                return indice.toFixed(2);
            },
            //Setter
            set separarEspaço(valor){       //pegar duas ou mais strings e adicionar a uma só, com espaço.
                valor = valor.spli(' ');
                this.nome = valor.shift();
                this.sobrenome = valor.join(' ');
            }
        };
    }
    const p1 = criaPessoa('Adriano', 'Gullo', 1.74, 64);
    console.log(p1.imc);      //imprime o imc
    console.log(p1.fala('sentada.'))       //imprime fala com oq está dentro do ();
    console.log(p1.nomeCompleto);*/

    /*//Função construtora:
    function pessoa(nome, sobrenome){
        //Atributos privados
        const ID = 12345;
        const metodoInterno = function(){

        };
        //Atributos ou métodos publicos (acessavel fora da função)
        this.nome = nome;
        this.sobrenome = sobrenome;

        this.metodo = function(){
            console.log(this.nome + ': sou um método');
        };
    }

    const pessoa1 = new pessoa ('Adriano', 'Gullo'); //new cria um objeto vazio e faz o this apontar para ele
    pessoa1.metodo();
    */

    /*//Função Recursiva:
    function recursiva(max){                //função se chama dentro dela mesmo até alguma comparação
        if(max>=10) return;                 //nesse caso, rota até o valor max ser 10.
        max++;
        console.log(max);
        recursiva(max);
    }
    recursiva(0);
    */

    /*//Função Geradora:
    //Lazy Avaliation
    function* geradora1(){
        yield 'Valor 1';            //semelhante ao return;
        yield 'Valor 2';            //cada vez que for executada, muda seu valor de acordo com definição
        yield 'Valor 3';
    }

    const g1 = geradora1();
    console.log(g1.next().value);   //Valor 1
    console.log(g1.next().value);   //Valor 2
    console.log(g1.next().value);   //Valor 3

    for(let valor of g1){           //Imprimi todos os valores de g1
        console.log(valor);
    }

    //Gerador de gerador
    function* gerador2(){
        yield 0;
        yield 1;
        yield 2;
    }
    function* gerador3(){
        yield* gerador2();
        yield 3;
        yield 4;
        yield 5;
    }
    */


//JavaScript - Arrays (avançado):

    /*//Básico:
    const nomes = ['Luiz', 'Rodolfo', 'Joao'];
    nomes[1] = 'Adriano';
    delete nomes[2];            //remove joao e não altera os indices, fica um empty item
    console.log(nomes);

    const novo = [...nomes];    //por esse declaração:
    novo.pop();
    console.log(nomes);         //novo nao afeta nomes

    nomes.shift()                       //retira do começo do array
    nomes.unshift('Wallace');           //adiciona no começo do array, diferente de push que insere no final
    const nomes2 = nomes.slice(1, 3);   //corta do indice um até dois, 3 não é incluso
    //const nomes2 = nomes.slice(0, -1); //remove o dado do último indice
    */
    
    /*//Converter string em array:
    const nome = 'Adriano Gullo Momesso';
    const nomeArray = nome.split(' ');
    console.log(nomes);

    //Retornando de array para string
    const nomestring = nomeArray.join(' '); 
    */
    
    /*//Método Splice:
    const nomes = ['Adriano', 'Joao', 'Eduardo', 'Gabriel', 'Julia'];
    //nomes.splice(indice atual, qtd delete, addElem1, addElem2,...addElem3);
    const removidos = nomes.splice(3, 2);      //Remove Gabriel[3] e Julia[4], removidos é outro array
    removidos = nomes.splice(2, 1, 'Otavio');       //Remove Eduardo[2] e adiciona Otavio

    //Usando como um Pop (retira ultimo elemento)
    const removidos1 = nomes.splice(-1, 1);

    //Usando como Shift (retira o primeiro elemento)
    const removidos2 = nomes.splice(0, 1);

    //Usando como Push (adicionar um elemento ao final do array)
    const removidos3 = nomes.splice(nomes.length, 0, 'Luiz');

    //Usando como Unshift (adiciona no primeiro elemento)
    const removidos4 = nomes.splice(0, 0, 'Ronaldo');
    */

    /*//Concatenando Arrays:
    const a1 = [1, 2, 3];
    const a2 = [4, 5, 6];
    const a3 = a1.concat(a2);                       //array+array vira array
    const a4 = a1.concat(a2, [7,8,9], 'Gullo');     //um array só, adicionando 7,8,9 e a string Gullo  

    const a5 = [...a1, ...a2, ...[7,8,9]];          //array vira a1+a2+[7,8,9]
    */

    /*//Filter:
    //Array com numeros maiores que 10
    const numeros = [5, 50, 80, 1, 2, 3, 5, 8, 7, 11, 15, 22, 27];
    const numerosFiltrados = numeros.filter(function(valor){    //é igual à = numeros.filter(valor=>valor>10);
        return valor>10;
     });
    console.log(numerosFiltrados);

    //Retorne as pessoas com +20 anos, nome > 5 letras e nome termina com A
    const pessoas = [
        {nome: 'Adriano', idade: 24},
        {nome: 'Robson', idade: 13},
        {nome: 'Fernanda', idade: 42},
        {nome: 'Rodrigo', idade: 04},
        {nome: 'Beatriz', idade: 32},
    ];
    const nomeGrande = pessoas.filter(valor => valor.nome.length>=5);
    const MaisDe20Anos = pessoas.filter(valor => valor.idade>20);
    const terminaComA = pessoas.filter(valor => valor.nome.toLocaleLowerCase().endsWith('a'));
    */

    /*//Map:

    //Dobrar numeros
    const numeros = [5, 10, 50, 80, 2, 5];
    const numerosDobrados = numeros.map(valor=>valor*2);
    console.log(numerosDobrados);

    //Para o objeto pessoas, retornar string com o nome da pessoa, outra com idade
    const pessoas = [
        {nome: 'Adriano', idade: 24},
        {nome: 'Roberto', idade: 45},
        {nome: 'Gessica', idade: 28},
        {nome: 'Lucas', idade: 33}
    ]

    const nomePessoas = pessoas.map(obj => obj.nome);
    console.log(nomePessoas);
    const idadePessoas = pessoas.map(obj => obj.idade); // obj => ({idade: obj.idade}) = retorna {idade: x}
    console.log(idadePessoas);

    //Adicionando uma chave de ID para cada objeto, mudando o original e em um NOVO OBJETO
    const comID = pessoas.map(function(obj, indice){
        obj.id = indice*15;
        return obj;
    });

    const comID2 = pessoas.map(function(obj, indice){
        const newObj = {...obj};
        newObj.id = indice*10;
        return newObj;
    })

    console.log(pessoas);
    console.log(comID2);
    */

    /*//Reduce:
    const numeros = [5, 10, 50, 80, 3];

    //Soma todos os valores em total em um único numero, valor inicial (0);
    const total = numeros.reduce(function(cont, valor){
        cont+=valor;
        return cont;
    }, 0);

    //Retornar array ([]) com pares (filter)
    const total2 = numeros.reduce(function(cont, valor, indice, array){
        if(valor%2 === 0) cont.push(valor);
        return cont;
    }, []);

    //Retoorna pessoa mais velha
    const pessoas = [
        {nome: 'Adriano', idade: 24},
        {nome: 'Roberto', idade: 45},
        {nome: 'Gessica', idade: 28},
        {nome: 'Lucas', idade: 33}
    ];

    const maisVelha = pessoas.reduce(function(acumulador, valor){
        if(acumulador.idade > valor.idade) return acumulador;
        return valor;
    });
    console.log(maisVelha);
    */

    /*//MAP + FILTER + REDUCE:
    //Returne a soma do dobro de todos os pares:
    const numeros = [5, 10, 50, 80, 3, 7, 12, 54, 33];
    const numerosPares = numeros.filter(function(valor){
        return valor % 2 === 0;
    }).map(function(valor){
        return valor*2;
    }).reduce(function(cont, valor){
        return cont+valor;
    })
    //Em arrow function:
    const numerosPares2 = numeros
        .filter(valor => valor % 2 === 0)
        .map(valor => valor*2)
        .reduce(valor=>cont+valor);
    */

    /*//forEach:
    const a1 = [1, 2, 3, 4, 5, 6, 7, 8];
    let total = 0;
    a1.forEach(valor => {
        total += valor;
    });
    console.log(total); //a1.forEach vai passar por cada elemento e somar no total;
    */
    
    //Alterar array = MAP
    //Filtrar array = Filter
    //Reduzir array = Reduce


//Javascript Objetos e prototypes (Avançado)

    /*//Criação OBJETO - Factory/Constructor Functions e Classes:
    //Definindo um novo Objeto e atribuindo novos dados:
    const pessoa = new Object();
    pessoa.nome = 'Adriano';
    pessoa.sobrenome = 'Gullo';
    pessoa.idade = 24;
    pessoa.falar = function(){
        return (`${this.nome} está falando.`);
    };

    console.log(pessoa.falar());

    //Molde de criação para Factory functions
    function criaPessoa (nome, sobrenome, idade){
        return{
            nome,
            sobrenome,
            idade,
            nomeCompleto(){
                return `${this.nome} ${this.sobrenome} ${this.idade}`;
            }
        };
    };
    const p1 = criaPessoa('Roberto', 'Carlos', 45);
    console.log(p1.nomeCompleto());

    //Molde de criação para Constructor functions
    function Pessoa(nome, sobrenome){
        this.nome = nome;               //o this é referente a pessoa que for criada
        this.sobrenome = sobrenome;
    };
    const p2 = new Pessoa('Luiz', 'Roberto');
    const p3 = new Pessoa('Maria', 'Lopes');
    console.log(p2);
    */

    /*//Object.defineProperty() e Object.defineProperties():
    function Produto(nome, preço, estoque){
        this.nome = nome;                           //variável publica
        this.preço = preço;                         //variável publica

        Object.defineProperty(this, 'estoque', {
            enumerable: true,                       //mostra a chave?
            value: estoque,                         //add valor
            writable: false,                        //pode alterar o valor?
            configurable: false,                    //configurável?
        });
    }

    const produto1 = new Produto('Camiseta', 22, 3);
    produto1.estoque = 5000;            //não vai alterar o valor de estoque (writable: false)
    delete produto1.estoque;            //não vai deletar estoque (configurable: false)
    console.log(produto1);

    //Com várias propriedades
    function Produto2(nome, preço, estoque){
        Object.defineProperty(this, {
            nome: {
                enumerable: true,                     
                value: nome,                         
                writable: false,                        
                configurable: false, 
            },
            preço: {
                enumerable: true,                     
                value: preço,                         
                writable: false,                        
                configurable: false, 
            },
            estoque: {
                enumerable: true,                     
                value: estoque,                         
                writable: false,                        
                configurable: false, 
            }
        });
    };
    */

    //Getters e Setters: