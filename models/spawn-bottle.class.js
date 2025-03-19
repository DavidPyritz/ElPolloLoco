/**
 * Represents a collectible bottle that appears in the game world.
 * The player can collect these bottles and use them as throwable objects.
 * Inherits from `DrawableObject`.
 */
class SpawnBottle extends DrawableObject {

    /**
 * Defines hitbox offsets for collision detection.
 */
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
 * Creates a new `SpawnBottle` instance with a random x-position.
 */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.y = 350;
        this.width = 100;
        this.height = 70;
        this.x = 400 + Math.random() * 18000;
    }
}