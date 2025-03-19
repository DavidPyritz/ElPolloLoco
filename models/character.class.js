/**
 * Represents the main player character in the game.
 * The character can move, jump, take damage, and interact with the environment.
 * Inherits from `MovableObject`.
 */
class Character extends MovableObject {
    world;
    height = 250;
    width = 140;
    y = 100;
    speed = 10;

    /**
   * Collision offset to adjust the hitbox.
   */
    offset = {
        top: 80,
        bottom: 10,
        left: 12,
        right: 12,
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    walking_sound = new Audio('audio/walking.mp3');
    lastMovementTime = Date.now();
    lastHurtTime = null;
    firstLanding = false;
    idleLongActive = false;
    idleLongInterval = null;

    /**
    * Initializes the character, loads assets, and starts animations.
    */
    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]); // Charakter beginnt mit Idle-Bild
        this.soundManager = soundManager;
        this.world = { keyboard: {} };
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
        this.checkIdleTime(); // Überprüft Inaktivität
    }

    /**
    * Starts the animation loop for movement and character actions.
    */
    animate() {
        setInterval(() => {
            this.handleMovement();
        }, 1000 / 60);

        setInterval(() => {
            this.playCharacter();
        }, 160);
    }

    /**
     * Überprüft alle 500ms, ob der Charakter 4 Sekunden nach einem Treffer
     * in den langen Idle-Modus wechseln soll.
     */
    checkIdleTime() {
        setInterval(() => {
            let idleTime = Date.now() - this.lastMovementTime;
            let timeSinceHurt = this.lastHurtTime ? Date.now() - this.lastHurtTime : 10000;
            if (this.isHurt()) {
                this.stopLongIdleAnimation();
                this.playAnimation(this.IMAGES_HURT);
                this.lastHurtTime = Date.now();
                return;
            }
            if (timeSinceHurt < 4000) {
                this.stopLongIdleAnimation();
                this.playAnimation(this.IMAGES_IDLE);
                return;
            }
            if (idleTime > 4000 && !this.idleLongActive) {
                this.idleLongActive = true;
                this.playLongIdleAnimation();
            }
        }, 500);
    }

    /**
     * Spielt die lange Idle-Animation ab, solange der Charakter nicht getroffen wird.
     */
    playLongIdleAnimation() {
        let index = 0;
        this.idleLongInterval = setInterval(() => {
            if (index >= this.IMAGES_IDLE_LONG.length || this.isMoving() || this.isHurt()) {
                this.stopLongIdleAnimation();
                return;
            }
            this.img = this.imageCache[this.IMAGES_IDLE_LONG[index]];
            index++;
        }, 300);
    }

    /**
   * Stoppt die lange Idle-Animation sofort.
   */
    stopLongIdleAnimation() {
        if (this.idleLongInterval) {
            clearInterval(this.idleLongInterval);
            this.idleLongInterval = null;
        }
        this.idleLongActive = false;
    }

    /**
     * Prüft, ob der Charakter sich bewegt.
     */
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE;
    }

    /**
   * Handles character movement based on keyboard input.
   */
    handleMovement() {
        let walking = this.processMovement();
        this.handleWalkingSound(walking);
        if (walking) {
            this.lastMovementTime = Date.now();
            this.stopLongIdleAnimation();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
   * Processes movement input and updates the character's state.
   * @returns {boolean} True if the character is moving, otherwise false.
   */
    processMovement() {
        let walking = false;
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x)
            this.moveRight(), this.otherDirection = false, walking = true;
        if (this.world.keyboard.LEFT && this.x > 0)
            this.moveLeft(), this.otherDirection = true, walking = true;
        if (this.world.keyboard.SPACE && !this.isAboveGround())
            this.jump(), walking = true;
        return walking;
    }

    /**
   * Handles walking sound effects.
   * @param {boolean} walking - Indicates if the character is moving.
   */
    handleWalkingSound(walking) {
        if (musicPlaying) {
            walking ? this.soundManager.playSound('walking') : this.soundManager.stopSound('walking');
        }
    }

    /**
     * Plays the appropriate animation based on the character's state.
     */
    playCharacter() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) { 
            this.stopLongIdleAnimation();
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.isMoving()) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (!this.idleLongActive) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
    * Makes the character jump by applying an upward velocity.
    */
    jump() {
        this.speedY = 30;
        this.lastMovementTime = Date.now();
        this.firstLanding = false; // Nach dem Sprung ist er nicht mehr auf dem Boden
    }

    /**
  * Called when the character lands on the ground.
  */
    onLand() {
        if (!this.firstLanding) {
            this.playAnimation(this.IMAGES_IDLE); // Zeigt das Idle-Bild nur beim ersten Landen nach dem Sprung
            this.firstLanding = true;
        }
    }
    /**
   * Handles interactions when the character jumps on an enemy.
   * @param {MovableObject} enemy - The enemy object.
   */
    jumpOn(enemy) {
        enemy.die();
    }
}