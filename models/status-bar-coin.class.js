/**
 * Represents the status bar for collected coins.
 * Displays the number of collected coins as a graphical bar.
 * Inherits from `DrawableObject`.
 */
class StatusBarCoin extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    percantage = 100;

    /**
 * Creates a new `StatusBarCoin` instance.
 * Initializes the position, size, and default coin state.
 */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 80;
        this.y = 20;
        this.width = 190;
        this.height = 40;
        this.setPercantage(0);
    }

    /**
 * Updates the coin status bar based on the given percentage.
 * Ensures the percentage stays within the 0-100 range.
 * @param {number} percantage - The new coin percentage (0-100).
 */
    setPercantage(percantage) {
        this.percantage = percantage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
 * Determines the correct status bar image index based on the number of collected coins.
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