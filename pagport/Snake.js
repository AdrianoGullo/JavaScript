const GameWidht = 608;
const GameWidth = 608;
const GameAreaX = 0;
const GameAreaY = 0;

const ImgSnake = document.getElementById("start-game");
const box1 = document.getElementById("boxSnake");
const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");
const box = 32;

const CabeçaCobra = new Image();
CabeçaCobra.src = 'pagport/Imagens/SnakeEyes/cabeçacobra.jpg';

const CorpoCobra = new Image();
CorpoCobra.src = 'pagport/Imagens/SnakeEyes/corpocobra.jpg';

document.addEventListener("keydown", function(event) {
  switch(event.key) {
    case "ArrowLeft":
    case "ArrowUp":
    case "ArrowRight":
    case "ArrowDown":
      event.preventDefault();
      break;
    default:
      break;
  }
});

let food = {
  x: Math.floor(Math.random()) * box,
  y: Math.floor(Math.random()) * box
};

let snake = [{
  x: 9 * box, 
  y: 10 * box
}];

function DesenhaCobra() {
  for(let i = 0; i < snake.length; i++){
    if(i === 0) {
      ctx.drawImage(CabeçaCobra, snake[i].x, snake[i].y, box, box);
    } else {
      ctx.drawImage(CorpoCobra, snake[i].x, snake[i].y, box, box);
    }
  }
}

function DesenhaComida() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}

let Score = 0;
function DesenhaScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + Score, 20, 40);
}

let Poder = 0;
function usarPoder(e){
  switch(e){
    case 1:
      //cobra perde metade do tamanho
      break;
    case 2:
      //caem 7 frutas no campo
      break;
    case 3:
      //fica imune ao tocar o corpo por 10 segundos
      break;
    case 4:
      //diminui a velocidade (usando SetInterval)
      break;
    case 5:
      //matar todas as cobrinhas
    default:
      return 0;
  }
}

let Direcao;
let UltimaDirecao;
function changeDirecao(event) {
  if (event.keyCode === 37) {
    Direcao = "left";
  } else if (event.keyCode === 38) {
    Direcao = "up";
  } else if (event.keyCode === 39) {
    Direcao = "right";
  } else if (event.keyCode === 40) {
    Direcao = "down";
  }
  if (event.keyCode === 32) {
    usarPoder(Poder);
  } 
  UltimaDirecao = Direcao;
}

//Atualiza a posição da cobra com base na última direção escolhida pelo usuário
function update() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  if (UltimaDirecao === "right") {
    snakeX += box;
    if (snakeX >= GameAreaX + GameWidht) {
      snakeX = GameAreaX;
    }
  }
  if (UltimaDirecao === "left") {
    snakeX -= box;
    if (snakeX < GameAreaX) {
      snakeX = GameAreaX + GameWidht - box;
    }
  }
  if (UltimaDirecao === "up") {
    snakeY -= box;
    if (snakeY < GameAreaY) {
      snakeY = GameAreaY + GameWidth - box;
    }
  }
  if (UltimaDirecao === "down") {
    snakeY += box;
    if (snakeY >= GameAreaY + GameWidth) {
      snakeY = GameAreaY;
    }
  }

  // verifica se a cobra comeu a comida
  if (snakeX === food.x && snakeY === food.y) {
    snake.unshift(newHead);
    food = {
      x: Math.floor(Math.random() * 16 + 1) * box,
      y: Math.floor(Math.random() * 16 + 3) * box
    };
    Score += 10;
  } 
  else {
    snake.pop();
    let newHead = {
      x: snakeX,
      y: snakeY
    };
    snake.unshift(newHead);
  }

  DesenhaCobra();
  DesenhaComida();
};

function iniciarJogo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  DesenhaCobra();
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    DesenhaCobra();
    DesenhaComida();
    DesenhaScore();
  }, 100);
  document.addEventListener("keydown", changeDirecao);
}

ImgSnake.addEventListener("click", function() {
  if (box1.style.display === 'none') {
    box1.style.display = 'block';
  } else{
    box1.style.display == 'none'
  }
  iniciarJogo();
});