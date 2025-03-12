class ThrowableObject extends MovableObject {

    constructor(x, y, direction) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.direction = direction; // ✅ Richtung wird gespeichert
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += this.direction * 10; // ✅ Fliegt nach links oder rechts!
        }, 50);
    }
}