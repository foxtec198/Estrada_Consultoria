import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

const canvas = document.getElementById("candles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 350;

const config = {
    candleCount: 60,      // número de velas por onda
    candleWidth: 12,      // largura das velas
    pauseTime: 100,      // pausa entre uma leva e outra (ms)
    speedMin: 0.4,        // velocidade mínima de subida
    speedMax: 1.0         // velocidade máxima de subida
};

class Candle {
    constructor() {
    this.reset();
    }

    reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.height = Math.random() * 60 + 30;
    this.bodyWidth = config.candleWidth;
    this.color = Math.random() > 0.5 ? "#606c38" : "#06402b"; // verde escuro e branco
    this.wickTop = this.height * (Math.random() * 0.2 + 0.1);
    this.wickBottom = this.height * (Math.random() * 0.2 + 0.1);
    this.speed = Math.random() * (config.speedMax - config.speedMin) + config.speedMin;
    this.finished = false;
    }

    update() {
    this.y -= this.speed;
    if (this.y + this.height + this.wickBottom < 0) {
        this.finished = true;
    }
    }

    draw() {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;

    // pavio (linha)
    ctx.beginPath();
    ctx.moveTo(this.x + this.bodyWidth / 2, this.y - this.wickTop);
    ctx.lineTo(this.x + this.bodyWidth / 2, this.y + this.height + this.wickBottom);
    ctx.stroke();

    // corpo
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.bodyWidth, this.height);
    }
}

let candles = [];
let active = true;

function startWave() {
    candles = Array.from({ length: config.candleCount }, () => new Candle());
    active = true;
}

function animate() {
    ctx.fillStyle = "ghostwhite";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (active) {
    candles.forEach(candle => {
        candle.update();
        candle.draw();
    });

    // se todas as velas já subiram, pausa e reinicia
    if (candles.every(c => c.finished)) {
        active = false;
        setTimeout(startWave, config.pauseTime);
    }
    }

    requestAnimationFrame(animate);
}

startWave();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
