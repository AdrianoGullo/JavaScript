const menuBtn = document.getElementById("menu-btn");
const menuBox = document.getElementById("menu-box");

//ABA MENU LATERAL DIREITA APARECER E SAIR
menuBtn.addEventListener("click", function() {
  if (menuBox.style.right === "-200px") {
    menuBox.style.right = "0";
  } else {
    menuBox.style.right = "-200px";
  }
});

/////////////////////////////////////////////////////////////

{//CRONÔMETRO:
const imagem1 = document.getElementById('imagem1');
const box1 = document.getElementById('box1');

imagem1.addEventListener('click', function() {

  if (box1.style.display === 'block') {
    box1.style.display = 'none';
  } else {
    box1.style.display = 'block';
  }
  
  box1.innerHTML = " CRONÔMETRO:";
    
  const iniciar = document.createElement('button');
  const pausar = document.createElement('button');
  const zerar = document.createElement('button');
  const relogio = document.createElement('p');  // criando o elemento HTML do relógio
  relogio.classList.add('relogio');
  relogio.style.fontWeight = 'bold';             // adicionando a classe "relogio" ao parágrafo
  relogio.textContent = '00:00:00';
  box1.appendChild(relogio);

  iniciar.textContent = 'Iniciar';
  pausar.textContent = 'Pausar';
  zerar.textContent = 'Zerar';

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
        relogio.innerHTML = criaHoraSegundos(segundos); // atualizando o conteúdo do parágrafo       
    }, 1000)
  }; 

  iniciar.addEventListener('click', function(event){
    relogio.classList.remove('pausado');
    iniciaRelogio();
  });

  pausar.addEventListener('click', function(event){
    relogio.classList.add('pausado');
    clearInterval(timer); // parando o temporizador
  });

  zerar.addEventListener('click', function(event){
    relogio.classList.remove('pausado');
    clearInterval(timer); // parando o temporizador
    segundos = 0;
    relogio.innerHTML = '00:00:00'; // reiniciando o conteúdo do parágrafo
  });
    
  box1.appendChild(iniciar);
  box1.appendChild(pausar);
  box1.appendChild(zerar);

  });
}



///////////////////////////////////////

//IMC:
const IMC = document.getElementById('ImgIMC');
var box1 = document.querySelector(".box");

IMC.addEventListener('click', function() {

  if (box1.style.display === 'block') {
    box1.style.display = 'none';
  } else {
    box1.style.display = 'block';
  }

  box1.classList.toggle("expandidoIMC");

  box1.innerHTML = "Cálculo de IMC:<br>";
  box1.innerHTML += "Menos do que 18,5: Abaixo do peso<br>";
  box1.innerHTML += "Entre 18,5 e 24,9: Peso normal<br>";
  box1.innerHTML += "Entre 25 e 29,9: Sobrepeso<br>";
  box1.innerHTML += "Entre 30 e 34,9: Obesidade de Grau 1<br>";
  box1.innerHTML += "Entre 35 e 39,9: Obesidade de Grau 2<br>";
  box1.innerHTML += "Mais do que 40: Obesidade de Grau 3";
  
});


///////////////////////////////////////////
/*ROTAÇÃO DOS GAMES NO PAINEL PRINCIPAL POR CLICK NA SETA*/
const container = document.querySelector('.container');
const elements = document.querySelectorAll('.element');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

let currentIndex = 0;

function rotateElements() {
  const containerWidth = container.clientWidth;
  const elementWidth = elements.clientWidth;
  const spaceBetweenElements = 10;
  const totalWidth = elements.length * (elementWidth + spaceBetweenElements);
  const marginLeft = (containerWidth - totalWidth) / 2;
  
  elements.forEach((element, index) => {
    element.style.transform = `translateX(-${currentIndex * (elementWidth + spaceBetweenElements) + marginLeft}px)`;
  });
}

function updateVisibleElements() {
  // oculta todos os elementos
  elements.forEach((element) => {
    element.style.display = 'none';
  });

  // mostra os três elementos ativos
  for (let i = currentIndex; i < currentIndex + 3; i++) {
    elements[i].style.display = 'flex';
  }
  
  // oculta o elemento mais à esquerda
  elements[currentIndex - 1].style.display = 'none';
}

arrowLeft.addEventListener('click', () => {
  currentIndex = Math.max(currentIndex - 1, 0);
  rotateElements();
  updateVisibleElements();
});

arrowRight.addEventListener('click', () => {
  if (currentIndex === elements.length - 3) {
    return;
  } else {
    currentIndex = Math.min(currentIndex + 1, elements.length - 2);
    rotateElements();
    updateVisibleElements();
    elements[currentIndex + 2].style.display = 'flex';
  }
});

for (let i = 0; i < currentIndex; i++) {
  elements[i].style.display = 'none';
}

// oculta os dois elementos adicionais
elements[3].style.display = 'none';
elements[4].style.display = 'none';

// inicia mostrando os três primeiros elementos
updateVisibleElements();