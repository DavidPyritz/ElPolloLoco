/**
 * Represents the status bar for the player's health.
 * Displays the player's remaining health as a graphical bar.
 * Inherits from `DrawableObject`.
 */
class StatusBarHealth extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percantage = 100;

    /**
 * Creates a new `StatusBarHealth` instance.
 * Initializes the position, size, and default health state.
 */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 100;
        this.y = 0;
        this.width = 200;
        this.height = 40;
        this.setPercantage(100);
    }

    /**
 * Updates the health status bar based on the given percentage.
 * Ensures the percentage stays within the 0-100 range.
 * @param {number} percantage - The new health percentage (0-100).
 */
    setPercantage(percantage) {
        this.percantage = percantage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
 * Determines the correct status bar image index based on the player's health.
 * @returns {number} The index of the corresponding health bar image.
 */
    resolveImageIndex() {
        return this.percantage == 100 ? 5
            : this.percantage > 80 ? 4
                : this.percantage > 60 ? 3
                    : this.percantage > 40 ? 2
                        : this.percantage > 20 ? 1
                            : 0;
    }
}