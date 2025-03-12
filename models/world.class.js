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
    throwableObjects = [];
    capturedObjects = [];
    coinCount = 0;
    bottleCount = 0;
    movableObjects = [];
    flyingBottles = [];
    lastThrowTime = 0; // Zeitpunkt des letzten Flaschenwurfs speichern

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        // 🏆 Endboss wird separat erstellt
        this.endboss = new Endboss();
        this.statusBarBoss = new StatusBarBoss(); // ✅ Eigene Statusleiste für den Boss


        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;                                       //console.log(this.level);
        for (let index = 0; index < 50; index++) {
            // this.level.enemies.push(new Chicken);
            this.level.clouds.push(new Cloud);
            this.throwableObjects.push(new SpawnBottle);
            this.capturedObjects.push(new SpawnCoin);
        }
    }

    run() {
        setInterval(() => {
            // this.checkCollisionEnemy();
            this.checkCollisionCoins();                                   //Coins einsammeln
            this.checkCollisionBottles();
            this.checkThrowObjects();
            this.checkCollisionChicken();
            this.collisionBottleBoss();
            // this.characterJumpOverTheChicken();
            this.collisionCharacterEndboss(); // ✅ Endboss wird separat geprüft
            // this.collisionCharacterBoss();
            this.checkCharacterEnemyCollisions();
        }, 50);
    }

    checkThrowObjects() {
        let now = Date.now(); // Aktuelle Zeit abrufen
        if (this.keyboard.D && this.statusBarBottle.percantage > 0 && now - this.lastThrowTime >= 1000) {
            this.lastThrowTime = now; // Zeitpunkt des Wurfs speichern
            let direction = this.character.otherDirection ? -1 : 1; // ✅ Richtung bestimmen
            let bottle = new ThrowableObject(
                this.character.x + (direction === 1 ? 100 : -50),
                this.character.y + 50,
                direction
            );
            this.flyingBottles.push(bottle);
            this.bottleCount -= 20;
            this.statusBarBottle.setPercantage(this.bottleCount);
    
            // 🏆 Sound beim Werfen der Flasche abspielen
            if (musicPlaying) {
                throwbottleglas_sound.currentTime = 0; // 🔄 Zurücksetzen für erneutes Abspielen
                throwbottleglas_sound.play();
            }
        }
    }
    

    checkCharacterEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.characterJumpToKill(enemy)) {
                if (enemy instanceof Chicken) {
                    enemy.die();
    
                    // 🔥 Sound abspielen, wenn ein Huhn besiegt wird
                    if (musicPlaying) {
                        diechicken_sound.play();
                    }
                }
            } else if (this.characterCollidingWithEnemies(enemy) && !enemy.isDead) {
                this.characterGetsHurt(); // Schaden wird korrekt registriert
            }
        });
    
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.isSplicable);
    }
    

    characterJumpToKill(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0;
    }

    characterCollidingWithEnemies(enemy) {
        return this.character.isColliding(enemy);
    }

    checkCollisionCoins() { // 🪙 Coins einsammeln  
        this.capturedObjects.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin();
                console.log('collissionCoinFunc', this.capturedObjects.length); 
    
                // 🔥 Sound beim Einsammeln abspielen
                if (musicPlaying) {
                    collectcoin_sound.play();
                }
    
                this.capturedObjects.splice(this.capturedObjects.indexOf(coin), 1);
                console.log('collissionCoinFunc', this.capturedObjects.length); 
    
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
                // 🔊 Sound für das Einsammeln der Flasche abspielen
                if (musicPlaying) {
                    collectbottle_sound.play();
                }
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

    characterGetsHurtByBoss() {
        this.character.energy -= 30; // Etwas weniger Schaden, damit er nicht zu schnell stirbt
        this.statusBarHealth.setPercantage(this.character.energy);

        console.log(`💥 Charakter hat jetzt ${this.character.energy} Energie!`);

        if (this.character.energy <= 0) {
            console.log("💀 Charakter wurde vom Endboss besiegt!");
            this.forceClearAllIntervals();
            showEndScreen();
        }

        // Letzten Trefferzeitpunkt aktualisieren, um Schaden alle 500ms zuzulassen
        this.character.lastHit = new Date().getTime();
    }

    collisionBottleBoss() {
        this.flyingBottles = this.flyingBottles.filter((bottle) => {
            if (bottle.isColliding(this.endboss)) {
                this.endboss.life -= 20;
                console.log('Boss getroffen! Neue Boss-Leben:', this.endboss.life);
                this.statusBarBoss.setPercantage(this.endboss.life);
                // 🔥 Endboss-Schrei (cry) bleibt aktiv, solange er noch lebt
                if (musicPlaying && this.endboss.life > 0) {
                    endbosscry_sound.play();
                }
                if (this.endboss.life <= 0) {  // ✅ Sicherstellen, dass der Wert nicht negativ wird
                    this.endboss.isDead = true;
                    // 🎵 Endboss-Todes-Sound abspielen, falls Musik aktiv ist
                    if (musicPlaying) {
                        endbossdie_sound.play();
                    }
                    setTimeout(() => {
                        this.forceClearAllIntervals();
                        showEndScreen('win'); // ✅ Richtiger Parameter für den Win-Screen!
                    }, 2000);
                }
                return false; // Entfernt die Flasche aus dem Array
            }
            return true; // Behalte die Flasche, falls keine Kollision erkannt wurde
        });
    }
    

    removeEndboss() {
        console.log("Endboss wird aus dem Spiel entfernt!");
        this.endboss = null; // ✅ Endboss wird gelöscht
    }

    collisionCharacterEndboss() {
        if (this.character.isColliding(this.endboss)) {
            console.log("🔥 Charakter wird vom Endboss getroffen!");

            if (!this.character.isHurt()) {
                this.characterGetsHurtByBoss();
            }
        }
    }

    characterGetsHurt() {
        const now = Date.now();
    
        if (!this.character.lastHurtTime || now - this.character.lastHurtTime >= 1000) { // ⏳ 1-Sekunden-Cooldown
            this.character.lastHurtTime = now; // 🕒 Letzten Trefferzeitpunkt speichern
    
            this.character.hit();
            this.statusBarHealth.setPercantage(this.character.energy);
    
            // 🔥 Sound für Schaden des Charakters abspielen (nur alle 1 Sekunde)
            if (musicPlaying) {
                charactergethurt_sound.play();
            }
    
            // **Direkt prüfen, ob Game Over ist**
            if (this.character.energy <= 0) {
                console.log("💀 Charakter ist gestorben! Game Over!");
                soundManager.stopAllSounds(); // 🔥 Alle Sounds stoppen
                showEndScreen();
            }
        }
    }

    checkCollisionChicken() {
        this.flyingBottles = this.flyingBottles.filter((bottle) => {
            let bottleRemoved = false;
            this.level.enemies = this.level.enemies.filter((chicken) => {
                if (chicken === this.endboss) return true; // ✅ Boss wird hier nicht berücksichtigt

                if (bottle.isColliding(chicken) && !bottleRemoved) {
                    console.log('Chicken getroffen und entfernt!');
                    if (musicPlaying) {
                        soundManager.playSound('diechicken');
                        diechicken_sound.play();
                    }
                    bottleRemoved = true;
                    return false; // 🐔 Huhn wird entfernt
                }
                return true;
            });
            if (bottleRemoved) return false; // Flasche wird entfernt
            return true;
        });
    }

    forceClearAllIntervals() {
        const highestId = setInterval(() => { }, 1000); // Get the highest interval ID
        for (let i = 0; i <= highestId; i++) {
            window.clearInterval(i); // Use window.clearInterval to ensure all are cleared
        }
        console.log('All intervals have been forcefully stopped!');
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
        this.addToMap(this.endboss);
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
        // mo.drawFrame(this.ctx);
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