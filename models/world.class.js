class World {
    character = new Character();
    level = level1;       //level = level1; bedeutet ehemals: enemies = level1.enemies; clouds = level1.clouds; backgroundObjects = level1.backgroundObjects;     
    enemies = level1.enemies;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;                              //Kamera geht mit im Bild, sonst läuft der character raus
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarBoss = new StatusBarBoss();
    throwableObjects = [];
    capturedObjects = [];
    coinCount = 0;
    bottleCount = 0;
    chickenCount = 0;
    movableObjects = [];
    flyingBottles = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;                                       //console.log(this.level);
        for (let index = 0; index < 50; index++) {
            this.level.enemies.push(new Chicken);
            this.level.clouds.push(new Cloud);
            this.throwableObjects.push(new SpawnBottle);
            this.capturedObjects.push(new SpawnCoin);
        }
    }

    run() {
        setInterval(() => {
            this.checkCollisionEnemy();
            this.checkCollisionCoins();                                   //Coins einsammeln
            this.checkCollisionBottles();
            this.checkThrowObjects();
            this.checkCollisionChicken();
            this.collisionBottleBoss();
            this.characterJumpOverTheChicken();
            // this.checkCharacterEnemyCollisions();
            this.collisionCharacterBoss();
        }, 50);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.statusBarBottle.percantage > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 50);
            this.flyingBottles.push(bottle); // Die Flasche wird ins richtige Array gepackt!

            this.bottleCount -= 20;
            // let percantageInABottle = Math.max(this.statusBarBottle.percantage - 5, 0);
            this.statusBarBottle.setPercantage(this.bottleCount);
        }
    }

    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();                       //wie oft er Punkte verliert
                this.statusBarHealth.setPercantage(this.character.energy);

                //console.log('Collision with Character, energy', this.character.energy);
            }
        });
    }

    checkCollisionCoins() {                                                     //Coins einsammeln
        this.capturedObjects.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin();
                console.log('collissionCoinFunc', this.capturedObjects.length);  //console.log();

                this.capturedObjects.splice(this.capturedObjects.indexOf(coin), 1);
                console.log('collissionCoinFunc', this.capturedObjects.length);  //console.log();

                this.statusBarCoin.setPercantage(this.coinCount);
            }
        });
    }

    collectCoin() {
        this.coinCount = Math.min(this.coinCount + 20, 100);
    }

    checkCollisionBottles() {
        this.throwableObjects.forEach((bottle) => {
            // Prüft, ob Charakter bereits 5 Flaschen hat (bottleCount 100)
            if (this.bottleCount >= 100) {
                console.log('Maximale Anzahl an Flaschen erreicht!');
                return;
            }
            if (this.character.isColliding(bottle)) {
                this.collectBottle();
                console.log('Flasche eingesammelt!', this.throwableObjects.length);
                this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                console.log('Verbleibende Flaschen im Spiel:', this.throwableObjects.length);
                this.statusBarBottle.setPercantage(this.bottleCount);
            }
        });
    }

    collectBottle() {
        this.bottleCount = Math.min(this.bottleCount + 20, 100);
        console.log('bottleCount', this.bottleCount);
    }

    collisionBottleBoss() {
        this.flyingBottles = this.flyingBottles.filter((bottle) => {
            if (bottle.isColliding(this.endboss)) {
                this.endboss.life -= 20;
                console.log('Boss getroffen! Neue Boss-Leben:', this.endboss.life);
                this.statusBarBoss.setPercantage(this.endboss.life);
                return false; // Entfernt die Flasche aus dem Array
            }
            return true; // Behalte die Flasche, falls keine Kollision erkannt wurde
        });
    }

    collisionCharacterBoss() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                characterGetsHurt();
            }
        });
    }

    characterGetsHurt() {
        this.character.hit();
        this.statusBar.setPercantage(this.character.energy);
    }

    checkCollisionChicken() {
        this.flyingBottles = this.flyingBottles.filter((bottle) => {
            let bottleRemoved = false;
            this.level.enemies = this.level.enemies.filter((chicken) => {
                if (bottle.isColliding(chicken) && !bottleRemoved) {
                    console.log('Chicken getroffen und entfernt!');
                    // 🎵 Nur abspielen, wenn Musik aktiviert ist
                    if (musicPlaying) {
                        soundManager.playSound('diechicken');
                        diechicken_sound.play();
                    }
                    bottleRemoved = true;
                    return false; // Huhn wird entfernt
                }
                return true; // Huhn bleibt im Array
            });
            if (bottleRemoved) return false; // Flasche wird entfernt
            return true; // Flasche bleibt
        });
    }

    characterJumpOverTheChicken() {
        this.level.enemies = this.level.enemies.filter((chicken) => {
            // Prüft, ob der Charakter mit dem Huhn kollidiert
            if (this.character.isColliding(chicken)) {
                let characterBottom = this.character.y + this.character.height;
                let chickenTop = chicken.y + chicken.height + 80;
                // Prüft, ob der Charakter wirklich von oben auf das Huhn fällt
                if (this.character.speedY < -30 && (characterBottom = chickenTop)) {
                    console.log('Character ist auf das Huhn gesprungen!');
                    console.log(this.character.speedY);
                    this.character.speedY = 0;
                    // 🎵 Sound abspielen, wenn Musik aktiv ist
                    if (musicPlaying) {
                        soundManager.playSound('diechicken');
                        diechicken_sound.play();
                    }
                    // 🏃 Bounce-Effekt: Der Charakter springt leicht nach oben
                    return false; // 🐔 Huhn entfernen
                }
            }
            return true; // Huhn bleibt bestehen
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //wird je nach grafikkarte 30 60 oder mehr fps pro sekunde aufgerufen, daher reihenfolge beachten
        //hiermit wird die welt ge-cleart
        //checken in den entwicklertools mit: world.character.x = 300
        //checken in den entwicklertools mit: world.enemies[0].x = 200
        this.ctx.translate(this.camera_x, 0);     //verschieben Ausschnitt 100 Pixel nach links
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);      //back
        //------- Space for fixed Objects -------
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        // this.addToMap(this.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.capturedObjects);
        this.addObjectsToMap(this.flyingBottles);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarBoss);
        //forward
        //es müssen 2 Argumente sein
        //Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {          //das sich der Character nach links bzw. nach rechts dreht, beim drücken der Richtungstaste
            this.flipImage(mo);
        }
        mo.draw(this.ctx);              //mo = movableObject
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    flipImage(mo) {
        this.ctx.save();              //variable otherDirection sorgt dafür das wenn die tase links gedrückt wird in character.js und movable Oject.js
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);         //Bild wird spiegelverkehrt eingefügt, save bedeutet reset und soll nicht gespiegelt werden
        mo.x = mo.x * -1;
    }
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}