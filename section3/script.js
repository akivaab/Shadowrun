/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = 500;
const canvasHeight = canvas.height = 1000;
const enemyArray = [];
const numberOfEnemies = 100;

class Enemy {
    constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.width = 100;
        this.height = 100;
        this.speed = Math.random() * 2 - 1;
    }
    update() {
        this.x += this.speed;
        this.y += this.speed;
    }
    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
};
for (let i = 0; i < numberOfEnemies; i++) {
    enemyArray.push(new Enemy());
}

function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    enemyArray.forEach(enemy => { 
        enemy.update();
        enemy.draw();
    });
    requestAnimationFrame(animate);
}
animate();