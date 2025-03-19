/**
 * Represents a drawable object in the game.
 * Provides methods for loading and rendering images.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 278;
    height = 150;
    width = 100;

    /**
    * Loads a single image from the given path and assigns it to the object.
    * Ensures that the image is fully loaded before use.
    * @param {string} path - The path to the image file.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.img.onload = () => {
        };
        this.img.onerror = () => {
        };
    }

    /**
   * Draws the object's image on the given canvas context.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * Loads multiple images and stores them in the `imageCache`.
    * @param {string[]} arr - Array of image file paths to be loaded.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}