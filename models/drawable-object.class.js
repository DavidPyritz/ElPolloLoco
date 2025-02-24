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

    drawFrame(ctx) {
        this.drawOuterFrame(ctx);
        this.drawInnerFrame(ctx);
    }
    
    drawOuterFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        if (this instanceof Character) {
            ctx.strokeStyle = 'blue';
        } else if (this instanceof Chicken) {
            ctx.strokeStyle = 'green';
        } else if (this instanceof SpawnBottle) {
            ctx.strokeStyle = 'purple';
        } else if (this instanceof Endboss) {
            ctx.strokeStyle = 'red';
        } else if (this instanceof SpawnCoin) {
            ctx.strokeStyle = 'yellow';
        }
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
    
    drawInnerFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SpawnBottle || this instanceof Endboss || this instanceof SpawnCoin) {
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + (this.offset?.left || 0),
                this.y + (this.offset?.top || 0),
                this.width - ((this.offset?.left || 0) + (this.offset?.right || 0)),
                this.height - ((this.offset?.top || 0) + (this.offset?.bottom || 0))
            );
            ctx.stroke();
        }
    }
    // character.isColliding(chicken);                      //alles was von movabelObject geerbt hat ist colliding function
    // isColliding(mo) {
    //     let offsetA = this.offset || { top: 0, left: 0, right: 0, bottom: 0 };
    //     let offsetB = mo.offset || { top: 0, left: 0, right: 0, bottom: 0 };
    //     return this.x + this.width - offsetA.right > mo.x + offsetB.left &&
    //            this.y + this.height - offsetA.bottom > mo.y + offsetB.top &&
    //            this.x + offsetA.left < mo.x + mo.width - offsetB.right &&
    //            this.y + offsetA.top < mo.y + mo.height - offsetB.bottom;
    // }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
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