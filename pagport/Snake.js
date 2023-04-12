const GAME_WIDTH = 608;
const GAME_HEIGHT = 608;
const GAME_AREA_X = 0;
const GAME_AREA_Y = 0;

const ImgSnake = document.getElementById("start-game");
const box1 = document.getElementById("boxSnake");
const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");
const box = 32;
let speed = 150; // velocidade atual da cobra
let intervalId;

// carrega a imagem da cobra
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

let direction;
let lastDirection;

// desenha a cobra na tela
function drawSnake() {
  for(let i = 0; i < snake.length; i++){
    if(i === 0) {
      // Desenha a cabeça da cobra com a imagem
      ctx.drawImage(CabeçaCobra, snake[i].x, snake[i].y, box, box);
    } else {
      // Desenha o corpo da cobra com a imagem
      ctx.drawImage(CorpoCobra, snake[i].x, snake[i].y, box, box);
    }
  }
}

// desenha a comida na tela
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}

// atualiza a posição da cobra com base na última direção escolhida pelo usuário
function update() {
  // armazena a posição da cabeça da cobra antes da atualização
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  // atualiza a posição da cabeça da cobra com base na última direção escolhida pelo usuário
  if (lastDirection === "right") {
    snakeX += box;
    if (snakeX >= GAME_AREA_X + GAME_WIDTH) {
      snakeX = GAME_AREA_X;
    }
  }
  if (lastDirection === "left") {
    snakeX -= box;
    if (snakeX < GAME_AREA_X) {
      snakeX = GAME_AREA_X + GAME_WIDTH - box;
    }
  }
  if (lastDirection === "up") {
    snakeY -= box;
    if (snakeY < GAME_AREA_Y) {
      snakeY = GAME_AREA_Y + GAME_HEIGHT - box;
    }
  }
  if (lastDirection === "down") {
    snakeY += box;
    if (snakeY >= GAME_AREA_Y + GAME_HEIGHT) {
      snakeY = GAME_AREA_Y;
    }
  }

  // verifica se a cobra comeu a comida
  if (snakeX === food.x && snakeY === food.y) {
    // cria um novo elemento na posição da cabeça da cobra
    snake.unshift(newHead);
    // cria uma nova comida
    food = {
      x: Math.floor(Math.random() * 16 + 1) * box,
      y: Math.floor(Math.random() * 16 + 3) * box
    };
  } 
  else {
    // remove o último elemento da cobra
    snake.pop();
    // cria um novo elemento na posição da cabeça da cobra
    let newHead = {
      x: snakeX,
      y: snakeY
    };
    snake.unshift(newHead);
  }

  // desenha a cobra na tela
  drawSnake();
  // desenha a comida na tela
  while(food.x > 600 && food.x < 0){
    food.x = Math.floor(Math.random()) * box
  }
  while(food.y > 600 && food.y < 0){
    food.y = Math.floor(Math.random()) * box 
  }
  drawFood();
};

// inicia o jogo
function iniciarJogo() {

  // limpa a tela
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // desenha a cobra
  drawSnake();
  // atualiza a posição da cobra com base na última direção escolhida pelo usuário
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    drawSnake();
    drawFood();
  }, 100);
  // atualiza a última direção escolhida pelo usuário
  document.addEventListener("keydown", changeDirection);
}

function changeDirection(event) {
  if (event.keyCode === 37) {
    direction = "left";
  } else if (event.keyCode === 38) {
    direction = "up";
  } else if (event.keyCode === 39) {
    direction = "right";
  } else if (event.keyCode === 40) {
    direction = "down";
  }
  // atualiza a última direção escolhida pelo usuário
  lastDirection = direction;
  speed *= 1.5/1.0;
}

// inicia o jogo ao clicar no botão "ImgSnake"
ImgSnake.addEventListener("click", function() {
  if (box1.style.display === 'none') {
    box1.style.display = 'block';
  } else{
    box1.style.display == 'none'
  }
  iniciarJogo();
});