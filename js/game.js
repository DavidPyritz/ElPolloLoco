let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;

let musicPlaying = false;
let soundManager = new SoundManager();
let soundList = ['background', 'walking', 'diechicken'];

let soundVolumes = {
    background: 0.1,
    walking: 0.6,
    diechicken: 0.05
};

// Manuelle Sounds für direkte Nutzung
let walking_sound = new Audio('audio/walking.mp3');
walking_sound.volume = soundVolumes.walking;

let diechicken_sound = new Audio('audio/diechicken.mp3');
diechicken_sound.volume = soundVolumes.diechicken;

// Alle Sounds aus dem Array laden und Lautstärke setzen
soundList.forEach((sound) => {
    soundManager.addSound(sound, `audio/${sound}.mp3`, soundVolumes[sound]);
});


function startStopMusic() {
    if (musicPlaying) {
        // 🎵 Stoppe alle Sounds im Array
        soundList.forEach((sound) => soundManager.stopSound(sound));
        // 🛑 Stoppe auch die manuellen Sounds
        walking_sound.pause();
        walking_sound.currentTime = 0;
        diechicken_sound.pause();
        diechicken_sound.currentTime = 0;
        musicPlaying = false;
    } else {
        // 🎵 Starte nur den Hintergrundsound
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

function fullScreen() {
    let content = document.getElementById('mainContent');
    let startScreen = document.getElementById('introScreen');
    let canvas = document.getElementById('canvas');
    if (canvas.classList.contains('fullscreen')) {
        canvas.classList.remove('fullscreen');
        startScreen.classList.remove('fullscreen');
        content.classList.remove('fullscreen');
    } else {
        content.classList.add('fullscreen');
        startScreen.classList.add('fullscreen');
        canvas.classList.add('fullscreen');
    }
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