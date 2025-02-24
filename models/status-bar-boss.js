class StatusBarBoss extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'

    ];

    percantage = 100;

    constructor() {
        super();                               // super muss immer rein, damit die methode vom übergeordneten Objekt initialisiert wird
        this.loadImages(this.IMAGES);
        this.x = 25;
        this.y = 65;
        this.width = 190;
        this.height = 40;
        this.setPercantage(100);
    }

    // setPercantage(50) wird auf 50% gerundet
    setPercantage(percantage) {
        this.percantage = percantage;       // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percantage > 81) {
            return 5;
        } else if (this.percantage > 61) {
            return 4;
        } else if (this.percantage > 41) {
            return 3;
        } else if (this.percantage > 21) {
            return 2;
        } else if (this.percantage > 1) {
            return 1;
        } else {
            return 0;
        }
    }
}