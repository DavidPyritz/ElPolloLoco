/**
 * Represents a throwable object in the game, such as a salsa bottle.
 * Inherits from `MovableObject` and can be thrown in a specified direction.
 */
class ThrowableObject extends MovableObject {

    /**
 * Creates a new throwable object.
 * @param {number} x - The initial x-coordinate position.
 * @param {number} y - The initial y-coordinate position.
 * @param {number} direction - The direction of the throw (-1 for left, 1 for right).
 */
    constructor(x, y, direction) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.direction = direction;
        this.throw();
    }

    /**
 * Initiates the throwing motion.
 * The object is affected by gravity and moves in the specified direction.
 */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += this.direction * 10;
        }, 50);
    }
}