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

    constructor() {
        super();                               // super muss immer rein, damit die methode vom übergeordneten Objekt initialisiert wird
        this.loadImages(this.IMAGES);
        this.x = 25;
        this.y = window.innerWidth <= 720 ? 140 : 65; // 🔥 Weiter unten in der Responsive-Ansicht
        this.width = 190;
        this.height = 40;
        this.setPercantage(100);
    }

    // setPercantage(50) wird auf 50% gerundet
    setPercantage(percentage) {
        this.percentage = Math.max(0, Math.min(100, percentage)); 
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        console.log(`Neue Boss-Statusbar: ${this.percentage}%`); 
    }

    resolveImageIndex() {
        if (this.percentage > 81) {
            return 5;
        } else if (this.percentage > 61) {
            return 4;
        } else if (this.percentage > 41) {
            return 3;
        } else if (this.percentage > 21) {
            return 2;
        } else if (this.percentage > 1) {
            return 1;
        } else {
            return 0;
        }
    }
}