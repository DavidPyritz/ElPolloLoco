/**
 * Represents a level in the game.
 * A level contains enemies, clouds, and background objects.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 3200;

    /**
 * Creates a new level instance.
 * @param {Array} enemies - The enemies that appear in the level.
 * @param {Array} clouds - The clouds present in the background.
 * @param {Array} backgroundObjects - The background elements for the level.
 */
    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}