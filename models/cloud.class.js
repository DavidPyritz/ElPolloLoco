class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.15;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 14000;            // Zahl zwischen 200 und 700
        this.animate();
        this.speedY = 0.15 + Math.random() * 2;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);  
    }
}