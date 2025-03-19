/**
 * Represents the Endboss in the game.
 * The Endboss moves towards the player, attacks, and adapts its behavior based on its remaining life.
 * Inherits from `MovableObject`.
 */
class Endboss extends MovableObject {
    height = 375;
    width = 250;
    y = 80;
    life = 100;
    isDead = false;
    speed = 0.5;
    otherDirection = false;

    /**
  * Defines hitbox offsets for collision detection.
  */
    offset = {
        top: 90,
        left: 10,
        right: 10,
        bottom: 10
    };

    /**
     * Alert animation frames.
     */
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

    /**
 * Initializes the Endboss with its default position and animations.
 */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ATTACKRIGHT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3200;
        this.animate();
    }

    /**
  * Starts the animation loop for movement and attacks.
  */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveTowardsCharacter(world.character);
            }
        }, 1000 / 60);
        setInterval(() => this.playEndbossAnimations(), 200);
        setInterval(() => this.handleEndbossMovement(), 2000);
    }

    /**
 * Moves the Endboss towards the player's character.
 * @param {Character} character - The player character.
 */
    moveTowardsCharacter(character) {
        if (!this.isDead) {
            this.updateSpeedBasedOnLife();
            this.moveTowardsCharacterPosition(character);
        }
    }

    /**
   * Adjusts the Endboss's speed based on its remaining life.
   */
    updateSpeedBasedOnLife() {
        if (this.life <= 30) {
            this.speed = 4;
        } else if (this.life <= 50) {
            this.speed = 3;
        } else if (this.life <= 80) {
            this.speed = 2;
        }
    }

    /**
  * Moves the Endboss left or right depending on the character's position.
  * @param {Character} character - The player character.
  */
    moveTowardsCharacterPosition(character) {
        if (this.x > character.x) {
            this.x -= this.speed;
            this.otherDirection = false;
        } else {
            this.x += this.speed;
            this.otherDirection = true;
        }
    }

    /**
   * Determines when the Endboss should attack or jump based on its life.
   */
    handleEndbossMovement() {
        if (!this.isDead && this.life <= 80) {
            this.executeRandomActionBasedOnLife();
        }
    }

    /**
  * Executes a random action (attack or jump) depending on the Endboss's remaining life.
  */
    executeRandomActionBasedOnLife() {
        let randomAction = Math.random();
        if (this.life <= 30) {
            randomAction < 0.7 ? this.attack() : this.jump();
        } else if (this.life <= 50) {
            randomAction < 0.6 ? this.attack() : this.jump();
        } else {
            randomAction < 0.5 ? this.attack() : this.jump();
        }
    }

    /**
  * Plays the appropriate animation based on the Endboss's state.
  */
    playEndbossAnimations() {
        if (this.isDead) return this.playDeadAnimation();
        if (this.isAttacking) return this.playAttackAnimation();
        if (this.speed > 0) return this.playWalkingAnimation();
        return this.playAlertAnimation();
    }

    /**
  * Plays the death animation.
  */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
    }

    /**
 * Plays the attack animation based on the Endboss's direction.
 */
    playAttackAnimation() {
        world.character.x > this.x ? this.playAnimation(this.IMAGES_ATTACKRIGHT) : this.playAnimation(this.IMAGES_ATTACK);
    }

    /**
 * Plays the walking animation.
 */
    playWalkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
 * Plays the alert animation.
 */
    playAlertAnimation() {
        this.playAnimation(this.IMAGES_ALERT);
    }

    /**
 * Makes the Endboss attack.
 */
    attack() {
        if (!this.isAttacking && !this.isDead) {
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            }, 2000);
        }
    }

    /**
 * Makes the Endboss jump.
 */
    jump() {
        if (!this.isJumping && !this.isDead) {
            this.isJumping = true;
            this.startJump();
        }
    }

    /**
 * Starts the jumping process.
 */
    startJump() {
        this.speedY = 20;
        this.applyGravity();
    }

    /**
 * Applies gravity to simulate falling after a jump.
 */
    applyGravity() {
        let gravityInterval = setInterval(() => {
            this.updatePosition();
            if (this.isAtGroundLevel()) {
                this.land(gravityInterval);
            }
        }, 50);
    }

    /**
     * Updates the Endboss's vertical position during a jump.
     * Applies a decreasing speed (`speedY`) to simulate gravity.
     */
    updatePosition() {
        this.y -= this.speedY;
        this.speedY -= 1.5;
    }

    /**
   * Checks if the Endboss has reached the ground level.
   * @returns {boolean} True if the Endboss is at ground level, otherwise false.
   */
    isAtGroundLevel() {
        return this.y >= 80;
    }

    /**
 * Handles landing behavior when the Endboss reaches the ground.
 * Stops the jump and clears the gravity effect.
 * @param {number} gravityInterval - The interval ID for the gravity effect.
 */
    land(gravityInterval) {
        this.y = 80;
        this.isJumping = false;
        clearInterval(gravityInterval);
    }
}