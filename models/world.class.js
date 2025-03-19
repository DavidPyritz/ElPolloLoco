/**
 * The World class manages the game world, including characters, enemies,
 * level objects, and interactions.
 */
class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObjects = [];
    capturedObjects = [];
    coinCount = 0;
    bottleCount = 0;
    movableObjects = [];
    flyingBottles = [];
    lastThrowTime = 0;

    /**
  * Initializes the world and sets up the game environment.
  * @param {HTMLCanvasElement} canvas - The game canvas.
  * @param {Keyboard} keyboard - The keyboard input handler.
  */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.endboss = new Endboss();
        this.statusBarBoss = new StatusBarBoss();
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
   * Sets up the world by assigning references and adding objects.
   */
    setWorld() {
        this.character.world = this;
        for (let index = 0; index < 50; index++) {
            this.level.clouds.push(new Cloud);
            this.throwableObjects.push(new SpawnBottle);
            this.capturedObjects.push(new SpawnCoin);
        }
    }

    /**
    * Runs the main game loop to check for collisions and interactions.
    */
    run() {
        setInterval(() => {
            this.checkCollisionCoins();
            this.checkCollisionBottles();
            this.checkThrowObjects();
            this.checkCollisionChicken();
            this.collisionBottleBoss();
            this.collisionCharacterEndboss();
            this.checkCharacterEnemyCollisions();
            this.checkCharacterEnemyCollisionsMini();
            this.checkCollisionChickenMini();
        }, 50);
    }

    /**
   * Checks if the player can throw a bottle.
   */
    checkThrowObjects() {
        let now = Date.now();
        if (this.canThrowBottle(now)) {
            this.lastThrowTime = now;
            this.throwBottle();
        }
    }

    /**
        * Determines whether a bottle can be thrown.
        * @param {number} now - The current timestamp.
        * @returns {boolean} True if a bottle can be thrown, otherwise false.
        */
    canThrowBottle(now) {
        return this.keyboard.D &&
            this.statusBarBottle.percantage > 0 &&
            now - this.lastThrowTime >= 1000;
    }

    /**
 * Throws a bottle in the direction the character is facing.
 */
    throwBottle() {
        let direction = this.character.otherDirection ? -1 : 1;
        let bottle = new ThrowableObject(
            this.character.x + (direction === 1 ? 100 : -50),
            this.character.y + 50,
            direction
        );
        this.flyingBottles.push(bottle);
        this.bottleCount -= 20;
        this.statusBarBottle.setPercantage(this.bottleCount);
        this.playThrowSound();
    }

    /**
     * Plays the sound effect for throwing a bottle.
     */
    playThrowSound() {
        if (musicPlaying) {
            throwbottleglas_sound.currentTime = 0;
            throwbottleglas_sound.play();
        }
    }

    /**
     * Checks for collisions between the character and enemy objects.
     */
    checkCharacterEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.characterJumpToKill(enemy)) {
                if (enemy instanceof Chicken) {
                    enemy.die();
                    playGameSound('diechicken');
                }
            } else if (this.characterCollidingWithEnemies(enemy) && !enemy.isDead) {
                this.characterGetsHurt();
            }
        });
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.isSplicable);
    }

    /**
 * Checks for collisions between the character and mini chickens.
 * If the character jumps on a mini chicken, it dies.
 * If the character collides with a mini chicken and is not jumping, the character takes damage.
 */
    checkCharacterEnemyCollisionsMini() {
        this.level.enemies.forEach((enemy) => {
            if (this.characterJumpToKill(enemy)) {
                if (enemy instanceof Chickenminis) {
                    enemy.die();
                    playGameSound('diechicken');
                }
            } else if (this.characterCollidingWithEnemies(enemy) && !enemy.isDead) {
                this.characterGetsHurt();
            }
        });
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.isSplicable);
    }

    /**
 * Checks if the character jumps on an enemy to defeat it.
 * The character must be colliding with the enemy, be above the ground,
 * and be moving downward (negative vertical speed).
 * @param {MovableObject} enemy - The enemy to check collision with.
 * @returns {boolean} True if the character successfully jumps on the enemy, otherwise false.
 */
    characterJumpToKill(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0;
    }

    /**
 * Checks if the character is colliding with an enemy.
 * @param {MovableObject} enemy - The enemy to check collision with.
 * @returns {boolean} True if the character is colliding with the enemy, otherwise false.
 */
    characterCollidingWithEnemies(enemy) {
        return this.character.isColliding(enemy);
    }

    /**
     * Handles collision detection between the character and coins.
     */
    checkCollisionCoins() {
        this.capturedObjects.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin();
                if (musicPlaying) {
                    collectcoin_sound.play();
                }
                this.capturedObjects.splice(this.capturedObjects.indexOf(coin), 1);
                this.statusBarCoin.setPercantage(this.coinCount);
            }
        });
    }

    /**
    * Increases the player's coin count up to a maximum of 100.
    */
    collectCoin() {
        this.coinCount = Math.min(this.coinCount + 20, 100);
    }

    /**
  * Handles collision detection between the character and throwable bottles.
  */
    checkCollisionBottles() {
        this.throwableObjects.forEach((bottle) => {
            if (this.bottleCount >= 100) {
                return;
            }
            if (this.character.isColliding(bottle)) {
                this.collectBottle();
                if (musicPlaying) {
                    collectbottle_sound.play();
                }
                this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                this.statusBarBottle.setPercantage(this.bottleCount);
            }
        });
    }

    /**
    * Increases the player's bottle count up to a maximum of 100.
    */
    collectBottle() {
        this.bottleCount = Math.min(this.bottleCount + 20, 100);
    }

    /**
 * Reduces the character's energy when hit by the boss.
 * If the character's energy drops to 0 or below, the game ends.
 * Updates the health status bar and records the time of the last hit.
 */
    characterGetsHurtByBoss() {
        this.character.energy -= 30;
        this.statusBarHealth.setPercantage(this.character.energy);
        if (this.character.energy <= 0) {
            this.forceClearAllIntervals();
            showEndScreen();
        }
        this.character.lastHit = new Date().getTime();
    }

    /**
     * Handles collision detection between bottles and the boss enemy.
     */
    collisionBottleBoss() {
        this.flyingBottles = this.flyingBottles.filter((bottle) => {
            if (bottle.isColliding(this.endboss)) {
                this.handleBossHit();
                return false;
            }
            return true;
        });
    }

    /**
    * Handles the event when the boss is hit by a bottle.
    */
    handleBossHit() {
        this.endboss.life -= 20;
        this.statusBarBoss.setPercantage(this.endboss.life);
        if (musicPlaying && this.endboss.life > 0) {
            endbosscry_sound.play();
        }
        if (this.endboss.life <= 0) {
            this.endboss.isDead = true;
            if (musicPlaying) {
                endbossdie_sound.play();
            }
            setTimeout(() => {
                this.forceClearAllIntervals();
                showEndScreen('win');
            }, 2000);
        }
    }

    /**
 * Removes the Endboss from the game world.
 */
    removeEndboss() {
        this.endboss = null;
    }

    /**
 * Checks if the character collides with the Endboss.
 * If a collision occurs and the character is not currently hurt, the character takes damage.
 */
    collisionCharacterEndboss() {
        if (this.character.isColliding(this.endboss)) {
            if (!this.character.isHurt()) {
                this.characterGetsHurtByBoss();
            }
        }
    }

    /**
 * Reduces the character's health when taking damage.
 * The character can only be hurt once per second.
 * If health reaches 0, the game ends.
 */
    characterGetsHurt() {
        const now = Date.now();
        if (!this.character.lastHurtTime || now - this.character.lastHurtTime >= 1000) {
            this.character.lastHurtTime = now;
            this.character.hit();
            this.statusBarHealth.setPercantage(this.character.energy);
            if (this.character.energy <= 0) {
                soundManager.stopAllSounds();
                showEndScreen();
            }
        }
    }

    /**
    * Clears all running intervals in the game.
    */
    forceClearAllIntervals() {
        const highestId = setInterval(() => { }, 1000);
        for (let i = 0; i <= highestId; i++) {
            window.clearInterval(i);
        }
    }

    /**
   * Draws all game objects on the canvas.
   */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.capturedObjects);
        this.addObjectsToMap(this.flyingBottles);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarBoss);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
    * Adds an array of objects to the canvas.
    * @param {Array} objects - The objects to be drawn.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    /**
   * Adds a single object to the canvas.
   * @param {MovableObject} mo - The object to be drawn.
   */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
 * Flips an image horizontally before drawing it.
 * @param {MovableObject} mo - The object to flip.
 */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
 * Restores the object's original position after being flipped.
 * This ensures that the object's coordinates remain correct for further updates.
 * @param {MovableObject} mo - The object to restore.
 */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}