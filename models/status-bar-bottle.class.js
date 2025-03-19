/**
 * Represents the status bar for the player's collected bottles.
 * Displays the number of collected bottles as a graphical bar.
 * Inherits from `DrawableObject`.
 */
class StatusBarBottle extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    percantage = 100;

    /**
 * Creates a new `StatusBarBottle` instance.
 * Initializes the position, size, and default bottle state.
 */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 65;
        this.y = 40;
        this.width = 175;
        this.height = 40;
        this.setPercantage(0);
    }

    /**
 * Updates the bottle status bar based on the given percentage.
 * Ensures the percentage stays within the 0-100 range.
 * @param {number} percantage - The new bottle percentage (0-100).
 */
    setPercantage(percantage) {
        this.percantage = percantage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
 * Determines the correct status bar image index based on the number of collected bottles.
 * @returns {number} The index of the corresponding status bar image.
 */
    resolveImageIndex() {
        return this.percantage > 81 ? 5
            : this.percantage > 61 ? 4
                : this.percantage > 41 ? 3
                    : this.percantage > 21 ? 2
                        : this.percantage > 1 ? 1
                            : 0;
    }
}