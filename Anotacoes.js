//Curso JavaScript e TypeScript//
//----------ANOTAÇÕES----------//

/*//Transformar input (prompt) em número e console.log/alert() no navegador;

let num1 = parseFloat(prompt("Número1:"));
let num2 = parseFloat(prompt("Número2:"));
const resultado = num1+num2;
console.log(resultado);
alert(resultado);

const nome = "Adriano"
console.log(nome);*/

{//console.log:
    /*//Exibição de aspas:
    let palavra = 'Um "texto"';     //     ou = "Um 'texto'"     ou = "Um \"texto"\";
    console.log(palavra);
    */

    /*//Formas de Concatenação:
    let palavra = "Uma palavra";

    console.log(palavra.concat(' diz tudo'));
    console.log(palavra + ' diz tudo');
    console.log('${palavra} diz tudo');
    */
}

{//STRINGS:
    /*//Procura de um caractere
    let palavra = "Palavra";
    console.log(palavra.indexOf('a'));         //(x, y) - o y é o index do caractere na string e procura a partir dela...
    console.log(palavra.lastIndexOf('a', 3));  //..., seja ela indexOf ou lastIndexOf
*/

    /*//Troca de palavras em string:
    let txt = "Outro dia";
    txt = txt.replace('Outro', 'Um');
    console.log(txt);*/

    /*//Troca em textos:
    let frase = "O rato roeu a roupa do rei de roma";
    let frase1 = frase.replace(/r/, '#');    //Troca o primeiro 'r'
    let frase2 = frase.replace(/r/g, '#');   //Todos os 'r's
    console.log(frase, frase1, frase2);*/

    /*//Tamanho de uma string:
    let frase = "O rato roeu a roupa do rei de roma";
    let tamanho = frase.length;
    console.log(tamanho);*/

    /*//Cortar a string:
    let frase = "O rato roeu a roupa do rei de roma";
    let rato = frase.slice(2, 6);
    console.log(rato);*/
        
    /*//Tirar caracteres
        let dividir = frase.split('r'); //separa em strings sem o r, pode ser um espaço tb,...
        console.log(dividir);           //... (x, y) -> o Y pode ser um numero q diga até quantas divisões quer
    */
    
    /*//Mudar Maiusculo <-> Minusculo:
    let Maiusculo = frase.toUpperCase(); 
    console.log(Maiusculo);
    let Minusculo = Maiusculo.toLowerCase();
    console.log(Minusculo);
    */

}

{//LISTAS:
    /*const alunos = ['Luiz', 'Jorge', 'Joao'];     //a estrutura 'lista' é const, mas seus dados podem ser auterados
    alunos[3] = 'Robert';                           //adiciona mesmo se não tiver em valor máximo da lista, aumentando ela
    alunos.push('Otavio');                          //adiciona sempre no FINAL
    alunos.unshift('Luiza');                        //adiciona na PRIMEIRA posição do array
    alunos.pop();                                   //retira o ULTIMO do array
    alunos.shift();                                 //retira o PRIMEIRO do array
    */
    /*// Duas+ [LISTAS, OBJETOS, FUNCTIONS] que apontam para o mesmo lugar na memória:
    let a = [1, 2, 3];      
    let b = a;

    a.push(4);                  //aqui o valor é adicionado na lista B também
    console.log(a, b);
    
    let c = [...a];             //essa notação garante que está copiando os valores e não apontando para o mesmo local na memória
    
    */

    /*//Lista dentro de Lista:
        const numeros = [[1,2,3], [4,5,6], [7,8,9]];
                indice:     0        1        2     
                          0 1 2    0 1 2    0 1 2
    */
}  

{//NÚMEROS
/*    let num1 = 1.03232612366;            //define número
    console.log(num1.toString());        //mostrar ele como string ou mudar para string com num1 = num1.toString;
    console.log(num1.toFixed(2));        //arrendonda para 2 casas decimais
    console.log(num1.isInteger());       //diz se o número é um INTEIRO ou NÃO
 */

    /*//Arredondamento e Objeto MATH

    let num2 = 1.7;
    let num3 = 0.1;
    num2 += num3;
    num2 = parseFloat(num2.toFixed(2));                     //mudado para inteiro

    num2 = Math.floor(num2);                                //arredonda pra BAIXO
    num2 = Math.ceil(num2);                                 //arrendo pra CIMA
    num2 = Math.round(num2);                                //arrendo para o numero mais próximo

    console.log(Math.max(1, 3, 5, 100, -30, 1349, 102));    //retorna o MAIOR número
    console.log(Math.min(1, 3, 5, 100, -30, 1349, 102));    //retorna o MENOR valor
    console.log(Math.random());                             //gera um número ALEATÓRIO
    console.log(Math.round(Math.random()*(10-5)+5));        //valor aleatório de 5 a 10 e arredondado para inteiro
    */
}

{/*Codagem no Navegador:   
    document.body.innerHTML = "Escreve na página";
    document.body.innerHTML += "e com += vai adicionando <br />";      //Com quebra de linha <br />
*/
}

{//OBJETOS:
/*    const pessoa1 = {                         //estrutura funciona similarmente ao Struct do C
        nome: 'Adriano',
        sobrenome: 'Gullo',
        idade: 23,
        Fala(){                               //ao chamar pessoa1.fala() irá aumentar a idade
            pessoa1.idade++;
        }
    };
    pessoa1.Fala();
    console.log(pessoa1.nome);                
    console.log(pessoa1.idade);               //idade sera de 24
*/
}

{//Lógica de Programação:
    /*Operadores de comparação:
        > maior que
        < menor que
        >= maior ou igual que
        <= menor ou igual que
        == igualdade (valor)
        === igualdade estrita (valor e tipo)
        != diferente (valor)
        !== diferente estrito (valor e tipo)
    */

    /*Operadores Lógicos:
        &&  (and/e)
        ||  (or/ou)
        !   (not/não)
        */

    /*Verificação de condicionais:
        Verificação para logar em um site:
        const vaiLogar = usuario === 'NomeCerto' && senha === '12345';
        console.log(vaiLogar)      // <-- retorna True para a 'vaiLogar' caso os dois parâmetros estejam certos 
        */

    /*Operação Ternária (condicional simples):
        //Opção para comparações mais simples e encurtar o código, exemplo:
        
        const pontuacaoUsuario = 1000;

        //Inicial
        if (pontuacaoUsuario >= 1000){
            console.log('Usuario VIP');
        } else {
            console.log('Usuario normal');
        }

        //Otimizado
        const nivelUsuario = pontuacaoUsuario >= 1000 ? 'Usuario VIP' : 'Usuario normal';
        console.log(nivelUsuario);
        
        //Exemplo para escolha de cor do usuario e cor padrão:
        const corUsuario = null;                        //usuario não selecionou nenhuma cor
        const corPadrao = corUsuario || 'Preta';        //então, a cor dele será a padrão (Preta)
        console.log(nivelUsuario, corPadrao);
        */

    /*Objeto Date (para manipular DATAS):
        
        //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date    <-- site para funções
        const data = new Date();            //cria uma data exata do momento (mes, dia, ano, hora)
        console.log(data.toString());

        const umaHora = 60*60*1000;         //segundos x minutos x milisegundos
        const umDia = 60*60*24*1000;        //segundos x minutos x horas x milisegundos

        const data1 = new Date(2023,3,20,15,14,27,450);       //ano,mes(começa do 0),dia,hora,minutos,segundos,milisegundos

        //Separando por String
        const data2 = new Date('2019-04-20T20:20:54.100');    //ano, mes, dia, hora, min, seg, ms
        console.log(data2.toString());
        
        //Para pegar informações específicas de tempo:
        console.log('Dia', data.getDate());
        console.log('Mês', data.getMonth());
        console.log('Ano', data.getFullYear()+1);
        console.log('Hora', data.getHours());
        console.log('Min', data.getMinutes());
        console.log('Seg', data.getSeconds());
        console.log('Milisegundos', data.getMilliseconds());
        console.log('Dia da semana', data.getDay());

        //Formata data:
        function formatarData(data){                          //funçao para pegar valores de uma data
            const dia = zeroEsquerda(data.getDate());
            const mes = zeroEsquerda(data.getMonth()+1);
            const ano = zeroEsquerda(data.getFullYear());
            const hora = zeroEsquerda(data.getHours());
            const min = zeroEsquerda(data.getMinutes());
            const seg = zeroEsquerda(data.getSeconds());

            return 
        }

        function zeroEsquerda (num){                          //função para adicionar um 0 se o num for menor que 10
            return num >= 10 ? num : `0${num}`;
        }

        const data3 = new Date();
        const dataBrasil = formatarData(data3);

        //Exibir data facilmente:
        const titulo = document.querySelector('.conteiner h1');
        const data = new Date();
        const opcoes = {
            dateStyle: 'full',
            timeStyle: 'short'
        };
        titulo.innerHTML = data.toLocaleDateString('pt-BR', opcoes);
        // ou
        titulo.innerHTML = data.toLocaleDateString('pt-BR', {dateStyle: 'full', timeStyle: 'short'});
    
        //Tratando entrada da data e editando formatação:
        const function retornaHora (data){
            if(data && !(data instanceof Date)){
                throw new TyperError('Esperando instância de Date.');
            }

            if(!data){
                data = new Date();
            }

            return data.toLocaleTimeString('pt-BR', {
            hour: '2-digit',            //deixa com 2 digitos
            minute: '2-digit',
            seconds: '2-digit',
            hour12: false               //em vez de 6:24:10 PM, irá ser 18:24:10 (de 12 para 24hrs)
            });
        }
        console.log(retronaHora());
        */

    /*Switch/Case:
        //Checar casos diferentes para uma variável
        const data4 = new Date('1987-04-21 00:00:00');
        let diaSemana = data4.getDay();                 //vai retorna o dia da semana
        let diaSemanaTexto;
        switch (diaSemana){
            case 0:
                diaSemanaTexto = 'Domingo';
                break;
            case 1:
                diaSemanaTexto = 'Segunda';
                break;
            case 2:
                diaSemanaTexto = 'Terça';
                break;
            case 3:
                diaSemanaTexto = 'Quarta';
                break;
            case 4:
                diaSemanaTexto = 'Quinta';
                break;
            case 5:
                diaSemanaTexto = 'Sexta';
                break;
            case 6:
                diaSemanaTexto = 'Sábado';
                break;
            default:                        //condição caso não vá para nenhum caso
                diaSemanaTexto = '-';
        }
    */

    /*Atribuição por Desestruturação:
        //Por ARRAY
            const numeros = [1, 2, 3, 4, 5, 6];
            const [PrimeiroNum, SegundoNum, ...resto] = numeros;
            console.log(resto);          //resto vai ser 3,4,5,6

            const numeros1 = [[1,2,3], [4,5,6], [7,8,9]];
            //pegar apenas o numero 6:
            const [,[,,seis]] = numeros1;               //[, pula o primeiro array [1.2.3], [,,seis] pula os valores de [4,5] para pegar o 6
            console.log(seis);
            
           
        //Por OBJETO:
            const info = {
                nome: 'Adriano',
                sobrenome: 'Gullo',
                idade: 24,
                endereco:{
                    rua: 'Germano Casellato',
                    numero: 11
                }
            };

            const {nome, sobrenome, idade, endereco} = info;
            console.log(nome, sobrenome, idade, endereco);      //o endereço está em forma de objeto, para pegar apenas eles:

            const {endereco:{rua, numero}} = info;              //pegando os dados de rua e numero do objeto endereço dentro do objeto info
            console.log(rua, numero);

            //resto:
            //const {nome, ...resto} = info;                    //tudo menos o nome
            //console.log(resto);
    */

{   //Função "FOR" e seus tipos:
        const frutas = ['Pera', 'Maça', 'Uva'];
        /*//FOR normal, incrementando contador (geralmente com iteráveis, arrays ou strings)
        for (let i = 0; i < frutas.length; i++){        
            console.log(frutas[i]);
        }*/
        
        /*//FOR IN:                 (retorna o indice ou chave / strings, arrays ou objetos)
        for (let i in frutas){                         
            console.log(frutas[i]);             //mostra valor, se for só (i) retorna index
        }
        const pessoa3 = {
            nome: 'Adriano',
            sobrenome: 'Gullo',
            idade: 24
        };
        for (let chave in pessoa3){             //vai pegar nome:... os valores de nome, sobrenome, idade
            console.log(chave, pessoa3[chave]); 
        }*/

        /*//FOR OF                    (retorna o valor em si / iteráveis, arrays, strings)
        const nome = 'Adriano Gullo';
        const nomes = ['Luiz', 'Gustavo', 'Felipe'];
        for (let valor of nome){
            console.log(valor);             //vai printar os caracteres por linha
        }
        nomes.forEach(function(valor, indice, array){   //vai mostrar o Luiz 0, Gustavo 1 e Felipe 2
            console.log(valor, indice, array);          
        });
        */
       }
    /*Tratamento e lançamento de erros (try, catch, throw):
        
        try {                                                   //executa quando não há erros
            console.log(naoExisto);
        } catch(err){                                           //executa quando há erros em try
            console.log('naoExisto não existe.');
        }

        function soma(x,y){
            if (typeof x !== 'number' || typeof y !== 'number'){
                throw new Error('x e y precisam ser números.');   //quando a função receber esse erro, vai jogar para **
            }
            return x+y;
        }

        try{
            console.log(soma(1, 2));
            console.log(soma('1', 2));
        }catch(error){                                             //**aqui, o throw será mostrado aqui
            console.log(error);
        } finally{
            //sempre é executado, tento erro ou não (rodando try ou catch)
        }
        */

    /*setInterval e setTimeout:

        function mostrarHora(){
            let data = new Date();
            return data.toLocaleDateString('pt-BR', {
                hour12: false
            });
        }
        //setInterval define um intervalo de tempo em que vai repetir o bloco dps de tanto tempo
        const timer = setInterval(function(){   //1000 milisecungods = 1 seg
            console.log(mostrarHora());         //vai executar a função de 1 em 1 seg e printar a hr
        }, 1000)

        //setTimeout faz para o um intervalo após funcionar o tempo que queria
        setTimeout(function(){                  //vai fazer o timer (intervalo definido) para dps de 10 seg
            clearInterval(timer);
        }, 10000);

        */
    
}
