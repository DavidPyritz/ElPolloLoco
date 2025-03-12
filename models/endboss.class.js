class Endboss extends MovableObject {
    height = 375;
    width = 250;
    y = 80;
    life = 100;
    isDead = false;
    speed = 0.5;
    otherDirection = false; // 🔄 Standardmäßig schaut der Endboss nach links

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
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

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

    IMAGES_ATTACKRIGHT = [
        'img/4_enemie_boss_chicken/3_attack/G13_flipped.png',
        'img/4_enemie_boss_chicken/3_attack/G14_flipped.png',
        'img/4_enemie_boss_chicken/3_attack/G15_flipped.png',
        'img/4_enemie_boss_chicken/3_attack/G16_flipped.png',
        'img/4_enemie_boss_chicken/3_attack/G17_flipped.png',
        'img/4_enemie_boss_chicken/3_attack/G18_flipped.png',
        'img/4_enemie_boss_chicken/3_attack/G19_flipped.png',
        'img/4_enemie_boss_chicken/3_attack/G20_flipped.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    isAttacking = false;

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ATTACKRIGHT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 3200; // Startposition des Endbosses
        this.animate();
    }

    moveTowardsCharacter(character) {
        if (!this.isDead) {
            if (this.life <= 30) {
                this.speed = 4;
            } else if (this.life <= 50) {
                this.speed = 3;
            } else if (this.life <= 80) {
                this.speed = 2;
            }

            // 🔄 Bestimme die Richtung des Endbosses
            if (this.x > character.x) {
                this.x -= this.speed; // Nach links bewegen
                this.otherDirection = false; // 🔄 Blickrichtung: LINKS
            } else {
                this.x += this.speed; // Nach rechts bewegen
                this.otherDirection = true; // 🔄 Blickrichtung: RECHTS
            }
        }
    }

    attack() {
        if (!this.isAttacking && !this.isDead) {
            this.isAttacking = true;
            console.log("Endboss attackiert!");

            setTimeout(() => {
                this.isAttacking = false;
            }, 2000);
        }
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveTowardsCharacter(world.character);
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isAttacking) {
                // 🔥 Wenn Charakter rechts ist, benutze `IMAGES_ATTACKRIGHT`
                if (world.character.x > this.x) {
                    this.playAnimation(this.IMAGES_ATTACKRIGHT);
                } else {
                    this.playAnimation(this.IMAGES_ATTACK);
                }
            } else if (this.speed > 0) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);

        setInterval(() => {
            if (!this.isDead && this.life <= 80) {
                let randomAction = Math.random();

                if (this.life <= 30) {
                    if (randomAction < 0.7) {
                        this.attack();
                    } else {
                        this.jump();
                    }
                } else if (this.life <= 50) {
                    if (randomAction < 0.6) {
                        this.attack();
                    } else {
                        this.jump();
                    }
                } else {
                    if (randomAction < 0.5) {
                        this.attack();
                    } else {
                        this.jump();
                    }
                }
            }
        }, 2000);
    }

    jump() {
        if (!this.isJumping && !this.isDead) {
            this.isJumping = true;
            this.speedY = 20;

            let gravityInterval = setInterval(() => {
                this.y -= this.speedY;
                this.speedY -= 1.5;

                if (this.y >= 80) {
                    this.y = 80;
                    this.isJumping = false;
                    clearInterval(gravityInterval);
                }
            }, 50);
        }
    }
}



