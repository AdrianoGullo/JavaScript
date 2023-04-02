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

    //Factory Functions (Funções Fábrica):
    