import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("candles-bg").appendChild(renderer.domElement);

// Parâmetros das velas
const candleCount = 80;
const candles = [];

function createCandle() {
    const isBullish = Math.random() > 0.5;
    const color = isBullish ? 0x006400 : 0xf8f8ff; // verde escuro e ghostwhite
    const height = Math.random() * 4 + 2;
    const geometry = new THREE.BoxGeometry(0.3, height, 0.3);
    const material = new THREE.MeshBasicMaterial({ color });
    const candle = new THREE.Mesh(geometry, material);

    candle.position.x = (Math.random() - 0.5) * 30;
    candle.position.y = -10 - Math.random() * 20;
    candle.position.z = (Math.random() - 0.5) * 10;

    scene.add(candle);
    candles.push(candle);
}

// Cria as velas iniciais
for (let i = 0; i < candleCount; i++) createCandle();

// Posição da câmera
camera.position.z = 15;
camera.position.y = 0;
camera.rotation.x = -0.2;

// Animação das velas subindo
function animate() {
    requestAnimationFrame(animate);

    candles.forEach(candle => {
    candle.position.y += 0.05;
    if (candle.position.y > 12) {
        candle.position.y = -12 - Math.random() * 10;
        candle.position.x = (Math.random() - 0.5) * 30;
    }
    });

    renderer.render(scene, camera);
}

animate();

// Responsividade
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
