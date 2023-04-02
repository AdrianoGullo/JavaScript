//Curso JavaScript e TypeScript//
//-----SCRIPTS PARA PÁGINA-----//

/*//01) Script para receber string por prompt e mostrar dados dela
    const nome = prompt('Digite seu nome:');
    document.body.innerHTML += `Seu nome é: <strong>${nome}</strong> <br />`;
    document.body.innerHTML += `Seu nome tem: ${nome.length} letras <br />`;
    document.body.innerHTML += `A segunda letra do seu nome é: ${nome[1]} <br />`;
    document.body.innerHTML += `Seu nome em maiusculo: ${nome.toUpperCase()} <br />`;
    document.body.innerHTML += `Seu nome em minusculo: ${nome.toLowerCase()} <br />`;
    document.body.innerHTML += `As últimas 3 letras do seu nome: ${nome.slice(-3, nome.length)} <br />`;
*/

/*//02)Usando Objeto ID para escrever na página:
    const num = parseFloat(prompt('Digite um número:'));
    const numeroTitulo = document.getElementById('NumeroTitulo');
    const texto = document.getElementById('Texto');

    numeroTitulo.innerHTML = num;
    texto.innerHTML = ' ';
    texto.innerHTML += `<p>Raiz quadrada: ${num**(1/2)} </p>`;
    texto.innerHTML += `<p>${num} é inteiro: ${Number.isInteger(num)} </p>`;
    texto.innerHTML += `<p>Arredondando para cima: ${Math.ceil(num)} </p>`;
    texto.innerHTML += `<p>Arredondando para baixo: ${Math.floor(num)} </p>`;
    texto.innerHTML += `<p>Duas casas decimais: ${num.toFixed(2)} </p>`;
*/

/*//03)Pegando dados de um FORMULÁRIO WEB através de objetos e salvado:
function meuEscopo () {
    const forms = document.querySelector('.forms');              //pegando objeto da class = form
    const resultado = document.querySelector('.resultado');
    let contador = 1;

    //Teste caso não envio
    forms.onsubmit = function(evento){
        evento.preventDefault();
        console.log(`Forms não foi enviado ${contador}.`);
        contador++;
    }

    //Recebendo dados de formulário para os objetos e jogando em array
    const pessoas = [];
    function recebeEventosForms (evento){
        evento.preventDefault();

        const nome = forms.querySelector('.nome');
        const peso = forms.querySelector('.peso');
        const altura = forms.querySelector('.altura');
        const idade = forms.querySelector('.idade');

        pessoas.push({
            nome: nome.value,
            peso: peso.value,
            altura: altura.value,
            idade: idade.value
        });
    
        console.log(pessoas);

    }
    forms.addEventListener('submit', recebeEventosForms);
}

meuEscopo();
*/

/*//04) Aula 58 - NodeList: Trocando fundo dos paragrafos para o mesmo que o fundo do site:
const paragrafos = document.querySelector('.paragrafos');
const ps = paragrafos.querySelectorAll('p');

const estilosBody = getComputedStyle(document.body);
const backgroundColorBody = estilosBody.backgroundColor;
console.log(backgroundColorBody);

for (let p of ps){
    p.style.backgroundColor = backgroundColorBody;
    p.style.color = '#FFFFFF'                           //e deixa a letra branca
}
*/

{ //05) CRIANDO UM SITE DE TIMER
    /*Definindo objetos e funções:
    
    const relogio = document.querySelector('.relogio');
    const iniciar = document.querySelector('.iniciar');
    const pausar = document.querySelector('.pausar');
    const zerar = document.querySelector('.zerar');
    let segundos = 0;
    let timer;

    function criaHoraSegundos (segundos){
        const data = new Date(segundos*1000);
        return data.toLocaleTimeString('pt-BR', {
            seconds: '2-digit',
            hour12: false,               //em vez de 6:24:10 PM, irá ser 18:24:10 (de 12 para 24hrs)
            timeZone: 'GMT'    
        });
    }

    function iniciaRelogio(){
        timer = setInterval(function(){
            segundos++;
            relogio.innerHTML = criaHoraSegundos(segundos);         
        }, 1000)
    };  */

    //Método escolhendo opções por clique em cada botão
    /*iniciar.addEventListener('click', function(event){
        relogio.classList.remove('pausado');
        iniciaRelogio();
    });

    pausar.addEventListener('click', function(event){
        relogio.classList.add('pausado');
        setTimeout(function(){
            clearInterval(timer);
        }, 0);
    });

    zerar.addEventListener('click', function(event){
        relogio.classList.remove('pausado');
        clearInterval(timer);
        segundos = 0;
        relogio.innerHTML = '00:00:00';
    }); */

    //Método escolhendo o click como target e descobrindo em qual botão foi:
    /*document.addEventListener('click', function(e){
        const el = e.target;
        if (el.classList.contains('zerar')){
            relogio.classList.remove('pausado');
            clearInterval(timer);
            segundos = 0;
            relogio.innerHTML = '00:00:00';
        }
        if (el.classList.contains('pausar')){
            relogio.classList.add('pausado');
            setTimeout(function(){
                clearInterval(timer);
            }, 0);
        }
        if (el.classList.contains('iniciar')){
            relogio.classList.remove('pausado');
            iniciaRelogio();
        }
    })*/
}
/*//06) SITE PARA TAREFAS (ADD E REMOVE) - Estilo Lista:
const inputTarefa = document.querySelector('.InputNovo');       //pega objeto Input
const BotaoTarefa = document.querySelector('.ButtonAdd');       //pega objeto Botão
const Tarefas = document.querySelector('.Tarefas');             //pega objeto Tarefas

function criaTarefa(textoInput){                                //função para adicionar nova tarefa no bloco
    const linha = document.createElement('li');                 //document.createElemente('li') -> o 'li' significa nova linha
    linha.innerText = textoInput;
    Tarefas.appendChild(linha);                                 //adiciona um 'filho' no bloco tarefas
    criaBotaoApagar(linha);                                     //cria o botao apagar ao lado
    salvarTarefas();                                            //salva as tarefas
};

function limpaInput(){                                          //para zerar o input quando envia uma tarefa
    inputTarefa.value = '';
};

function criaBotaoApagar(li){      
    const botaoApagar = document.createElement('button');       //cria um elemento de botão
    botaoApagar.innerText = 'x';                                //botão: x
    botaoApagar.style.float = 'right';                          //posiciona o botao a direita do bloco
    botaoApagar.setAttribute('class', 'apagar');                //classe apagar
    botaoApagar.setAttribute('title', 'Apagar essa tarefa');    //titulo, para mouse em cima do botao
    li.appendChild(botaoApagar);                                //adiciona um botão filho à tarefa recem adicionada
};

function salvarTarefas(){                                       //função para salvar as tarefas adicionadas
    const liTarefas = Tarefas.querySelectorAll('li');           //para todos os li's (linhas)
    const listadeTarefas = [];                                  //cria um array

    for (let i of liTarefas){                                   //para cada elemento no array:
        let tarefaTexto = i.innerText;                          //variavel recebe o texto da linha
        tarefaTexto = tarefaTexto.replace('x', '').trim();      //nela, substitiu o botão por vazio e recorta o espaço
        listadeTarefas.push(tarefaTexto);                       //adiciona o texto no array 'listadeTarefas'
    }
    const tarefasJSON = JSON.stringify(listadeTarefas);         //transforma todas as tarefas em uma unica string
    localStorage.setItem('tarefas', tarefasJSON);               //armazena como LocalStorage a string de tarefas
};

inputTarefa.addEventListener('keypress', function(e){           //função para controlar o input
    if (e.keyCode === 13){                                      //keypress == ENTER, adiciona tarefa
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
        limpaInput();
    }
});

BotaoTarefa.addEventListener('click', function(){               //função para controlar o input
    if (!inputTarefa.value) return;                             
    criaTarefa(inputTarefa.value);                              //adiciona tarefa depois de click no botão
    limpaInput();                                               //limpa o input
});

document.addEventListener('click', function(e){                 //para remover uma tarefa
    const el = e.target;                                        //cria uma variavel com o target
    if(el.classList.contains('apagar')){                        //verifica se contem a classe "apagar" (definida em criarBotaoApagar js.170)
        el.parentElement.remove();                              //remove o elemento pai (cjá que o botão é child do que está escrito na tarefa)
        salvarTarefas();                                        //salva a alteração
    }
});

function adicionaTarefasSalvas(){                               //função para salvar as tarefas mesmo att a pág
    const tarefas = localStorage.getItem('tarefas');            //recebe os valores armazenados em LocalStorage com classe tarefas
    const listaDeTarefas = JSON.parse(tarefas);                 //transforma elas em array novamente

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa);                                     //recria as tarefas que estavam salvas, não perdendo ao atualizar a pag
    }
};
adicionaTarefasSalvas()                                         //chama a função quando inicada a pagina
*/

