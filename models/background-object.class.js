/**
 * Represents a background object in the game world.
 * This class extends `MovableObject` to position static background elements.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}