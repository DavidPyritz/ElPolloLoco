class Chicken extends MovableObject {
    height = 60;
    width = 90;
    y = 353;
    health = 20;
    isDead = false;
    diechicken_sound = new Audio('audio/diechicken.mp3');

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    //hühnchen töten
    IMAGES_DEADCHICK = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    offset = {
        top: 0,
        bottom: 0,
        left: 5,
        right: 5,
    };

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEADCHICK);
        this.isDead = false;
        this.x = 900 + Math.random() * 1500;
        this.speed = 1;
        this.animate();
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        if (this.health === 0) {
            this.die();
        }
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        //Hühnchen laufen
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.speed = 0;
        this.img = this.imageCache[this.IMAGES_DEADCHICK[0]];

        setTimeout(() => {
            this.y = -1000;
        }, 1000);
    }
}