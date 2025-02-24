class Endboss extends MovableObject {

    height = 375;
    width = 250;
    y = 80;
    life = 100;
    isDead = false;
    speed = 0.5; // 🏃 Geschwindigkeit des Endbosses
    offset = {
        top: 90,
        left: 10,
        right: 10,
        bottom: 10
    };

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G.png',
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    isAttacking = false; // Status des Endbosses

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);

        this.loadImages(this.IMAGES_DEAD);

        this.x = 3200; // Startposition des Endbosses
        this.animate();
    }

    /**
     * Lässt den Endboss nach links laufen.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Schaltet zwischen Lauf- und Angriffsanimation um.
     */
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false; // Nach einer gewissen Zeit hört er auf zu angreifen
        }, 3000);
    }

    animate() {
        // Bewegung nach links
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // 60 FPS für flüssige Bewegung

        // Wechsel zwischen Lauf- und Angriffsanimation
        setInterval(() => {
            if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK); // 🎥 Angriff abspielen
            } else {
                this.playAnimation(this.IMAGES_ALERT); // 🎥 Laufanimation abspielen
            }
        }, 200);

        // Der Endboss greift in zufälligen Abständen an
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% Chance, dass er angreift
                this.attack();
            }
        }, 3000);
    }

    // die() {
    //     if (this.isDead) return;
    //     this.isDead = true;
    //     this.speed = 0;
    //     this.img = this.imageCache[this.IMAGES_DEADCHICK[0]];

    //     setTimeout(() => {
    //         this.y = -1000;
    //     }, 1000);
    // }
}