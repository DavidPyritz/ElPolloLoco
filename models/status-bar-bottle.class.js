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

    constructor() {
        super();                               // super muss immer rein, damit die methode vom übergeordneten Objekt initialisiert wird
        this.loadImages(this.IMAGES);
        this.x = 65;
        this.y = window.innerWidth <= 720 ? 110 : 40; // 🔥 Weiter unten in der Responsive-Ansicht
        this.width = 175;
        this.height = 40;
        this.setPercantage(0);
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