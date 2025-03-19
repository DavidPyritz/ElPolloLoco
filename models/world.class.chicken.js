/**
 * Checks for collisions between bottles and chickens.
 * If a bottle hits a chicken, the chicken is removed from the game.
 */
World.prototype.checkCollisionChicken = function () {
    this.flyingBottles = this.flyingBottles.filter((bottle) => {
        let bottleRemoved = this.checkBottleCollisionWithChickens(bottle);
        return !bottleRemoved;
    });
};

/**
 * Handles collision detection between thrown bottles and chickens.
 * Removes the first chicken hit by a bottle.
 * @param {ThrowableObject} bottle - The thrown bottle.
 * @returns {boolean} True if a bottle hit a chicken, otherwise false.
 */
World.prototype.checkBottleCollisionWithChickens = function (bottle) {
    let bottleRemoved = false;
    this.level.enemies = this.level.enemies.filter((chicken) => {
        if (chicken === this.endboss) return true;
        if (bottle.isColliding(chicken) && !bottleRemoved) {
            this.playChickenHitSound();
            bottleRemoved = true;
            return false;
        }
        return true;
    });
    return bottleRemoved;
};

/**
 * Plays the sound effect when a chicken is hit by a bottle.
 */
World.prototype.playChickenHitSound = function () {
    if (musicPlaying) {
        soundManager.playSound('diechicken');
        diechicken_sound.play();
    }
};

/**
 * Checks for collisions between bottles and mini chickens.
 * If a bottle hits a mini chicken, the mini chicken is removed from the game.
 */
World.prototype.checkCollisionChickenMini = function () {
    this.flyingBottles = this.flyingBottles.filter((bottle) => {
        let bottleRemoved = this.checkMiniChickenCollision(bottle);
        return !bottleRemoved;
    });
};

/**
 * Handles collision detection between thrown bottles and mini chickens.
 * Removes the first mini chicken hit by a bottle.
 * @param {ThrowableObject} bottle - The thrown bottle.
 * @returns {boolean} True if a bottle hit a mini chicken, otherwise false.
 */
World.prototype.checkMiniChickenCollision = function (bottle) {
    let bottleRemoved = false;
    this.level.enemies = this.level.enemies.filter((chicken) => {
        if (chicken === this.endboss) return true;
        if (bottle.isColliding(chicken) && !bottleRemoved) {
            this.playChickenMiniHitSound();
            bottleRemoved = true;
            return false;
        }
        return true;
    });
    return bottleRemoved;
};

/**
 * Plays the sound effect when a mini chicken is hit by a bottle.
 */
World.prototype.playChickenMiniHitSound = function () {
    if (musicPlaying) {
        soundManager.playSound('diechicken');
        diechicken_sound.play();
    }
};