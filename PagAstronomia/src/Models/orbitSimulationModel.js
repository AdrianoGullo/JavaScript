// orbitSimulationModel.js   
//********ainda em andamento******

const orbitSimulationData = {
    sol: null,
    planets: [],
    G: 1,
    numPlanetas: 5,
};

function setup(canvas) {
    orbitSimulationData.sol = new corpo(100, { x: canvas.width / 2, y: canvas.height / 2 }, { x: 0, y: 0 });
    
    for(let i = 0; i < orbitSimulationData.numPlanetas; i++){
        let r = random(orbitSimulationData.sol.r, Math.min(canvas.width, canvas.height) / 2 - 50);
        let theta = Math.random() * Math.PI * 2;
        let planetaPosicao = { x: canvas.width / 2 + r * Math.cos(theta), y: canvas.height / 2 + r * Math.sin(theta) };
        let planetaVel = { x: planetaPosicao.x, y: planetaPosicao.y };
        let distancia = Math.sqrt(orbitSimulationData.G * orbitSimulationData.sol.massa / Math.hypot(planetaPosicao.x, planetaPosicao.y));
        let angulo = Math.atan2(planetaPosicao.y, planetaPosicao.x);
        planetaVel.x = distancia * Math.cos(angulo - Math.PI / 2);
        planetaVel.y = distancia * Math.sin(angulo - Math.PI / 2);
    
        orbitSimulationData.planets.push(new corpo(25, planetaPosicao, planetaVel));
    }
}

function draw(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < orbitSimulationData.planets.length; i++){
        orbitSimulationData.sol.gravidadePlanetaria(orbitSimulationData.planets[i]);
        orbitSimulationData.planets[i].update();
        orbitSimulationData.planets[i].show(ctx, 0, 0, 0);
    }
    orbitSimulationData.sol.show(ctx, 255, 0, 0);
}

function corpo(massa, posicao, velocidade) {
    this.massa = massa;
    this.posicao = posicao;
    this.velocidade = velocidade;
    this.r = this.massa;

    this.show = function (ctx, r, g, b) {
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.beginPath();
        ctx.arc(this.posicao.x, this.posicao.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }

    this.update = function () {
        this.posicao.x += this.velocidade.x;
        this.posicao.y += this.velocidade.y;
    }

    this.forcaAplicada = function(f){
        this.velocidade.x += f.x / this.massa;
        this.velocidade.y += f.y / this.massa;
    }

    this.gravidadePlanetaria = function(child){
        let dx = child.posicao.x - this.posicao.x;
        let dy = child.posicao.y - this.posicao.y;
        let r = Math.hypot(dx, dy);
        let f = { x: dx / r, y: dy / r };
        let g = orbitSimulationData.G * this.massa * child.massa / (r * r);
        child.forcaAplicada({ x: f.x * g, y: f.y * g });
    }
}

module.exports = { setup, draw };
