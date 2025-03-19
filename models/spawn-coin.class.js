/**
 * Represents a collectible coin in the game world.
 * Coins are used to increase the player's score.
 * Inherits from `DrawableObject`.
 */
class SpawnCoin extends DrawableObject {

    /**
     * Defines hitbox offsets for collision detection.
     */
    offset = {
        top: 20,
        left: 30,
        right: 30,
        bottom: 20
    };

    IMAGES = [
        'img/8_coin/full_rotating_coin_0.png',
        'img/8_coin/full_rotating_coin_1.png',
        'img/8_coin/full_rotating_coin_2.png',
        'img/8_coin/full_rotating_coin_3.png',
        'img/8_coin/full_rotating_coin_4.png',
        'img/8_coin/full_rotating_coin_5.png',
        'img/8_coin/full_rotating_coin_6.png',
        'img/8_coin/full_rotating_coin_7.png',
        'img/8_coin/full_rotating_coin_8.png'
    ];

    /**
 * Creates a new `SpawnCoin` instance with a random position.
 * The coin will have an animation effect.
 */
    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.y = 150;
        this.width = 100;
        this.height = 70;
        this.x = 400 + Math.random() * 18000;
        this.y = 150 + Math.random() * 20;
        this.animate();
    }

    /**
 * Animates the coin by cycling through the `IMAGES` array.
 * The animation runs in a loop, updating every 100ms.
 */
    animate() {
        let i = 0;
        setInterval(() => {
            this.img = this.imageCache[this.IMAGES[i]];
            i = (i + 1) % this.IMAGES.length;
        }, 100);
    }
}