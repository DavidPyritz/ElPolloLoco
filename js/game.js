let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;

let musicPlaying = false;
let soundManager = new SoundManager();
let soundList = ['background', 'walking', 'diechicken', 'throwbottleglas', 'collectcoin', 'endbosscry', 'endbossdie', 'collectbottle', 'charactergethurt'];


let soundVolumes = {
    background: 0.1,
    walking: 0.6,
    diechicken: 0.05,
    throwbottleglas: 0.4,
    collectcoin: 0.8,
    endbosscry: 0.8,
    endbossdie: 0.8,
    collectbottle: 0.5,
    charactergethurt: 0.5
};

// Manuelle Sounds für direkte Nutzung
let walking_sound = new Audio('audio/walking.mp3');
walking_sound.volume = soundVolumes.walking;
let diechicken_sound = new Audio('audio/diechicken.mp3');
diechicken_sound.volume = soundVolumes.diechicken;
let throwbottleglas_sound = new Audio('audio/throwbottleglas.mp3');
throwbottleglas_sound.volume = soundVolumes.throwbottleglas;
let collectcoin_sound = new Audio('audio/collectcoin.mp3');
collectcoin_sound.volume = soundVolumes.collectcoin;
let endbosscry_sound = new Audio('audio/endbosscry.mp3');
endbosscry_sound.volume = soundVolumes.endbosscry;
let endbossdie_sound = new Audio('audio/endbossdie.mp3');
endbossdie_sound.volume = soundVolumes.endbossdie;
let collectbottle_sound = new Audio('audio/collectbottle.mp3');
collectbottle_sound.volume = soundVolumes.collectbottle;
let charactergethurt_sound = new Audio('audio/charactergethurt.mp3');
charactergethurt_sound.volume = soundVolumes.charactergethurt;


// Alle Sounds aus dem Array laden und Lautstärke setzen
soundList.forEach((sound) => {
    soundManager.addSound(sound, `audio/${sound}.mp3`, soundVolumes[sound]);
});


function startStopMusic() {
    if (musicPlaying) {
        // 🔇 Stoppe alle Sounds
        soundList.forEach((sound) => soundManager.stopSound(sound));

        // 🛑 Stoppe auch die manuellen Sounds
        walking_sound.pause();
        walking_sound.currentTime = 0;
        diechicken_sound.pause();
        diechicken_sound.currentTime = 0;
        throwbottleglas_sound.pause();
        throwbottleglas_sound.currentTime = 0;
        collectcoin_sound.pause();
        collectcoin_sound.currentTime = 0;
        collectbottle_sound.pause();
        collectbottle_sound.currentTime = 0;
        endbosscry_sound.pause();
        endbosscry_sound.currentTime = 0;
        endbossdie_sound.pause();
        endbossdie_sound.currentTime = 0;
        charactergethurt.pause(); // 🔥 Neu hinzugefügt
        charactergethurt.currentTime = 0;

        musicPlaying = false;
    } else {
        // 🎵 Hintergrundsound starten
        soundManager.playSound('background');
        musicPlaying = true;
    }
}


function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
        startScreen = document.getElementById('introScreen');
        startScreen.classList.add('d-none');
        canvas.classList.remove('d-none');
    }
}

function showManual() {
    document.getElementById("manualContainer").innerHTML = `
        <div id="manualModal" class="modal">
            <h2>Spielsteuerung</h2>
            <p>◀ Links: <b>Linke Richtungstaste</b></p>
            <p>▶ Rechts: <b>Rechte Richtungstaste</b></p>
            <p>🔼 Springen: <b>Space</b></p>
            <p>🍾 Flaschen werfen: <b>Taste D</b></p>
            <button class="close-btn" onclick="closeManual()">Schließen</button>
        </div>
    `;
    document.getElementById("manualModal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closeManual() {
    document.getElementById("manualContainer").innerHTML = "";
    document.getElementById("overlay").style.display = "none";
}

function toggleFullScreen() {
    let elements = ['mainContent', 'introScreen', 'canvas'];
    elements.forEach(id => document.getElementById(id).classList.toggle('fullscreen'));
}

function showEndScreen(type) {
    let startScreen = document.getElementById('introScreen');
    let canvas = document.getElementById('canvas');
    startScreen.classList.remove('d-none');
    canvas.classList.add('d-none');
    // 🏆 Korrektes Bild setzen
    let imagePath = type === 'win' 
        ? 'img/9_intro_outro_screens/win/win_2.png' 
        : 'img/9_intro_outro_screens/game_over/game over.png';
    
    startScreen.src = imagePath;
    document.querySelector('.buttons').style.display = 'none';
    // Stelle sicher, dass vorherige Buttons entfernt werden
    let oldButtons = document.querySelector('.end-buttons');
    if (oldButtons) oldButtons.remove();
    // Home-Button als Teil des Bildschirms platzieren
    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('end-buttons');
    let homeButton = document.createElement('button');
    homeButton.innerText = '🏠 Home';
    homeButton.classList.add('homebutton');
    homeButton.onclick = () => location.reload();
    buttonContainer.appendChild(homeButton);
    startScreen.parentNode.appendChild(buttonContainer);
}

/////////////////////
/////////////////////

function checkOrientation() {
    let rotateMessage = document.getElementById('rotate-message');
    let mainContent = document.getElementById('mainContent');

    if (window.innerWidth <= 720 && window.innerHeight > window.innerWidth) {
        // Hochformat -> Nur die Dreh-Meldung anzeigen
        rotateMessage.style.display = "flex";
        mainContent.style.display = "none";
    } else {
        // Querformat -> Spiel anzeigen, Dreh-Meldung ausblenden
        rotateMessage.style.display = "none";
        mainContent.style.display = "flex";
    }
}

// Beim Laden prüfen
window.onload = checkOrientation;

// Erneut prüfen, wenn das Gerät gedreht wird
window.addEventListener("resize", checkOrientation);


function setKey(key, state) {
    keyboard[key] = state;
}


window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {                        //Keyboard Tasten Zuweisung
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    //console.log(e);
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});