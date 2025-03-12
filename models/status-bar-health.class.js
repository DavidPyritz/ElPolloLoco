class StatusBarHealth extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',   // 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'   // 5
    ]; 
 
    percantage = 100;

    constructor() {
        super();                               // super muss immer rein, damit die methode vom übergeordneten Objekt initialisiert wird
        this.loadImages(this.IMAGES);
        this.x = 100;
        this.y = window.innerWidth <= 720 ? 70 : 0; // 🔥 Weiter unten in der Responsive-Ansicht
        this.width = 200;
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
        if (this.percantage == 100) {
            return 5;
        } else if (this.percantage > 80) {
            return 4;
        } else if (this.percantage > 60) {
            return 3;
        } else if (this.percantage > 40) {
            return 2;
        } else if (this.percantage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
