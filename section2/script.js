const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = 800;
const canvasHeight = canvas.height = 700;
let gameSpeed = 15;
//let gameFrame = 0;

window.addEventListener('load', function() {
    const slider = document.getElementById('slider');
    slider.value = gameSpeed;
    const displayGameSpeed = document.getElementById('gameSpeed');
    displayGameSpeed.innerHTML = gameSpeed;
    slider.addEventListener('change', function(e) {
        gameSpeed = e.target.value;
        displayGameSpeed.innerHTML = gameSpeed;
    });

    class Layer {
        constructor(imageSrc, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = canvasHeight;
            this.image = new Image();
            this.image.src = imageSrc;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width) {
                this.x = 0;
            }
            this.x = Math.floor(this.x - this.speed);
            //this.x = (gameFrame * this.speed) % this.width;
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
        }
    }
    
    const layer1 = new Layer('layer-1.png', 0.2);
    const layer2 = new Layer('layer-2.png', 0.4);
    const layer3 = new Layer('layer-3.png', 0.6);
    const layer4 = new Layer('layer-4.png', 0.8);
    const layer5 = new Layer('layer-5.png', 1);
    const gameObjects = [layer1, layer2, layer3, layer4, layer5];
    
    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        gameObjects.forEach(object => {
            object.update();
            object.draw();
        });
        //gameFrame++;
        requestAnimationFrame(animate);
    }
    animate();    
});
