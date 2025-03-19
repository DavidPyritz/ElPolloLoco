/**
 * Represents the status bar for the Endboss in the game.
 * Displays the boss's remaining health as a graphical bar.
 * Inherits from `DrawableObject`.
 */
class StatusBarBoss extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    percentage = 100;

    /**
 * Creates a new `StatusBarBoss` instance.
 * Initializes the position, size, and default health state.
 */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 25;
        this.y = 65;
        this.width = 190;
        this.height = 40;
        this.setPercantage(100);
    }

    /**
 * Updates the health bar based on the given percentage.
 * Ensures the percentage stays within the 0-100 range.
 * @param {number} percentage - The new health percentage (0-100).
 */
    setPercantage(percentage) {
        this.percentage = Math.max(0, Math.min(100, percentage));
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
 * Determines the correct health bar image index based on the boss's health.
 * @returns {number} The index of the corresponding health bar image.
 */
    resolveImageIndex() {
        return this.percentage > 81 ? 5
            : this.percentage > 61 ? 4
                : this.percentage > 41 ? 3
                    : this.percentage > 21 ? 2
                        : this.percentage > 1 ? 1
                            : 0;
    }
}