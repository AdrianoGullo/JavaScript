const GAME_WIDTH = 608;
const GAME_HEIGHT = 608;
const GAME_AREA_X = 0;
const GAME_AREA_Y = 0;

const ImgSnake = document.getElementById("start-game");
const box1 = document.getElementById("boxSnake");
const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");
const box = 32;
let speed = 150;
let intervalId;
let Score = 0;

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

function drawSnake() {
  for(let i = 0; i < snake.length; i++){
    if(i === 0) {
      ctx.drawImage(CabeçaCobra, snake[i].x, snake[i].y, box, box);
    } else {
      ctx.drawImage(CorpoCobra, snake[i].x, snake[i].y, box, box);
    }
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}


//Atualiza a posição da cobra com base na última direção escolhida pelo usuário
function update() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  let newHead = {
    x: snakeX,
    y: snakeY
  };

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

  drawSnake();
  drawFood();
};

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + Score, 20, 40);
}

function iniciarJogo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    drawSnake();
    drawFood();
    drawScore();
  }, 100);
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
  lastDirection = direction;
  speed *= 1.5/1.0;
}

ImgSnake.addEventListener("click", function() {
  if (box1.style.display === 'none') {
    box1.style.display = 'block';
  } else{
    box1.style.display == 'none'
  }
  iniciarJogo();
});