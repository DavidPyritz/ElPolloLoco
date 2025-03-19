/**
 * Represents a movable object in the game.
 * This includes characters, enemies, and throwable objects.
 * Inherits from `DrawableObject`.
 */
class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
    * Defines hitbox offsets for collision detection.
    */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    /**
   * Applies gravity to the object, causing it to fall if it's in the air.
   * Runs continuously at a set interval.
   */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                if (this instanceof Character) {
                    this.onLand(); // Sobald der Charakter den Boden berührt, rufe die Funktion auf
                }
            }
        }, 1000 / 25);
    }

    /**
   * Checks if the object is colliding with another `MovableObject`.
   * @param {MovableObject} mo - The object to check collision with.
   * @returns {boolean} True if there is a collision, otherwise false.
   */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
 * Determines if the object is above ground level.
 * Throwable objects are always considered above ground.
 * 
 * @returns {boolean} True if the object is above ground, otherwise false.
 */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 170;
        }
    }

    /**
 * Reduces the object's energy when it takes damage.
 * If energy drops below 0, it is set to 0.
 */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
 * Checks if the object was recently hit.
 * @returns {boolean} True if the object was hit in the last 500ms.
 */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 500;
    }

    /**
 * Checks if the object's energy has reached zero.
 * @returns {boolean} True if the object is dead, otherwise false.
 */
    isDead() {
        return this.energy == 0;
    }

    /**
    * Plays an animation by cycling through an array of images.
    * @param {string[]} images - Array of image paths for the animation.
    */
    playAnimation(images) {
        if (images.length === 0) return; // Sicherheitsprüfung
        let i = this.currentImage % images.length;
        let path = images[i];
        if (this.imageCache[path]) {
            this.img = this.imageCache[path]; // Nur setzen, wenn es existiert
        } else {
        }
        this.currentImage++;
    }

    /**
   * Moves the object to the right by increasing its x-coordinate.
   */
    moveRight() {
        this.x += this.speed;
    }

    /**
 * Moves the object to the left by decreasing its x-coordinate.
 */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
  * Makes the object jump by setting a vertical speed.
  */
    jump() {
        this.speedY = 30;
    }

    /**
 * Triggers the enemy's death when the object jumps on it.
 * @param {MovableObject} enemy - The enemy object to be defeated.
 */
    jumpOn(enemy) {
        enemy.die();
    }
}