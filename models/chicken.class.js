/**
 * Represents a normal enemy chicken in the game.
 * Chickens move from right to left and can be defeated by attacks.
 * Inherits from `MovableObject`.
 */
class Chicken extends MovableObject {
    height = 60;
    width = 90;
    y = 353;
    health = 20;
    isDead = false;
    diechicken_sound = new Audio('audio/diechicken.mp3');

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEADCHICK = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
    * Defines hitbox offsets for collision detection.
    */
    offset = {
        top: 0,
        bottom: 0,
        left: 8,
        right: 8,
    };

    /**
    * Initializes a new `Chicken` instance with a random position and speed.
    */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEADCHICK);
        this.isDead = false;
        this.x = 500 + Math.random() * 5000;
        this.speed = 1 + Math.random() * 1.2;
        this.animate();
    }

    /**
    * Reduces the chicken's health by a specified amount.
    * If health reaches zero, the chicken dies.
    * 
    * @param {number} amount - The damage amount to apply.
    */
    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        if (this.health === 0) {
            this.die();
        }
    }

    /**
     * Starts the movement and animation loop for the chicken.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    /**
    * Kills the chicken, stops movement, and plays the death animation.
    * After a delay, the chicken is removed from the game.
    */
    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.speed = 0;
        this.img = this.imageCache[this.IMAGES_DEADCHICK[0]];
        setTimeout(() => {
            this.y = -1000;
        }, 1000);
    }
}