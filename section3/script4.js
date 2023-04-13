/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = 500;
const canvasHeight = canvas.height = 1000;
const enemyArray = [];
const numberOfEnemies = 20;
let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy4.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (canvasWidth - this.width);
        this.y = Math.random() * (canvasHeight - this.height);
        this.newX = Math.random() * (canvasWidth);
        this.newY = Math.random() * (canvasHeight);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 50);
    }
    update() {
        if (gameFrame % this.interval === 0) {
            this.newX = Math.random() * (canvasWidth - this.width);
            this.newY = Math.random() * (canvasHeight - this.height);
        }
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx / Math.floor(this.interval / 5);
        this.y -= dy / Math.floor(this.interval/ 5);
        if (this.x + this.width < 0) {
            this.x = canvasWidth;
        }
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, 
            this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
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
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();