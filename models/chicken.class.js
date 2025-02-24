class Chicken extends MovableObject {

    height = 70;
    width = 100
    y = 360
    isDead = false;

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    //hühnchen töten
    IMAGES_DEADCHICK = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    diechicken_sound = new Audio('audio/diechicken.mp3');

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.loadImages(this.IMAGES_DEADCHICK);

        this.x = 200 + Math.random() * 50000;
        this.speed = 0.01 + Math.random() * 2;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        //Hühnchen laufen
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
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