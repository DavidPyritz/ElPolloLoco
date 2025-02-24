class MovableObject extends DrawableObject {
    speed = 0.15;                                //nur für bewegbare Objekte
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    applyGravity() {                                      //funktion sollte nur bewegliche Objekte haben
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {                                        //funktion sollte nur bewegliches Objekt haben
        if (this instanceof ThrowableObject) {               //Throable object should always fall
            return true;
        } else {
            return this.y < 180;
        }
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();       //Zeit in Zahlenform speichern
        }                                              // in consolge eingebe: new Date().getTime(); 1737726126306 das sind die millisekunden die vergangen sind seit dem 01.01.1970
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000;                       // Difference in s                       
        return timepassed < 1;                                //console.log(timepassed); über dem return timepassed < 1; einfügen     
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;  //let i = 0 % 6; => 1, Rest 1 / % modulu hebt den rest auf somit nicht mehr ende 7 sondern wieder 1 am anfang, lenght länge vom array
        //er geht 5x durch also i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5,
        let path = images[i];   //das nullte Bild aus dem Array und laden das hier rein
        this.img = this.imageCache[path];               // aus Image Cache laden wir Bild aus von einem Pfad
        this.currentImage++;                            // um die Zahl immer um eins zu erhöhen (Modul 5 glaube ich)

    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;               //Hühnchen wird alle 0.25 sekunden von der x koordinate abgezogen, daher wanderts nach links
    }

    jump() {
        this.speedY = 30;                       //so hoch kann pepe springen
    }
}