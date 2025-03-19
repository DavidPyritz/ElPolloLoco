/**
 * Represents a cloud object in the game world.
 * Clouds move from right to left to create a dynamic background effect.
 * Inherits from `MovableObject`.
 */
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.15;

    /**
    * Initializes a new `Cloud` instance with a random position and speed.
    */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 14000;
        this.animate();
        this.speedY = 0.15 + Math.random() * 2;
    }

    /**
 * Starts the animation loop, moving the cloud continuously to the left.
 */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}