class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 278;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();      //this.img = document.getElementById('image')  <img id="image" src>
        this.img.src = path;         //funktion sollte nur feste Objekte haben
    }


    draw(ctx) {                     //funktion sollte nur feste Objekte haben
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
 * 
 * @param {Array} arr - ['img/image1.png','img/image2.png', ...]
 */

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

}