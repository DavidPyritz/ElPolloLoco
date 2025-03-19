/**
 * The game canvas where the world is rendered.
 * @type {HTMLCanvasElement}
 */
let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;
let musicPlaying = false;

/**
 * List of sound effect names used in the game.
 * @type {string[]}
 */
let soundList = [
    'background', 'walking', 'diechicken', 'throwbottleglas',
    'collectcoin', 'endbosscry', 'endbossdie', 'collectbottle'
];

/**
 * Predefined volume levels for each sound effect.
 * @type {Object.<string, number>}
 */
let soundVolumes = {
    background: 0.1,
    walking: 0.6,
    diechicken: 0.05,
    throwbottleglas: 0.4,
    collectcoin: 0.8,
    endbosscry: 0.4,
    endbossdie: 0.8,
    collectbottle: 0.5,
};

/**
 * Loads an audio file and sets its volume.
 * @param {string} file - The path to the audio file.
 * @param {number} volume - The volume level (between 0 and 1).
 * @returns {HTMLAudioElement} The loaded audio object.
 */
function loadSound(file, volume) {
    let sound = new Audio(file);
    sound.volume = volume;
    return sound;
}

/**
 * Loads sound effects with predefined volume levels.
 */
let walking_sound = loadSound('audio/walking.mp3', soundVolumes.walking);
let diechicken_sound = loadSound('audio/diechicken.mp3', soundVolumes.diechicken);
let throwbottleglas_sound = loadSound('audio/throwbottleglas.mp3', soundVolumes.throwbottleglas);
let collectcoin_sound = loadSound('audio/collectcoin.mp3', soundVolumes.collectcoin);
let endbosscry_sound = loadSound('audio/endbosscry.mp3', soundVolumes.endbosscry);
let endbossdie_sound = loadSound('audio/endbossdie.mp3', soundVolumes.endbossdie);
let collectbottle_sound = loadSound('audio/collectbottle.mp3', soundVolumes.collectbottle);

/**
 * Initializes a dictionary of sound objects for dynamic access.
 */
let soundObjects = {};
soundList.forEach(sound => {
    soundObjects[sound] = new Audio(`audio/${sound}.mp3`);
    soundObjects[sound].volume = soundVolumes[sound];
    soundObjects[sound].muted = true;
});

/**
 * Creates an instance of the sound manager to control game sounds.
 */
let soundManager = new SoundManager();

/**
 * Saves the current music playing state to local storage.
 */
function saveMusicState() {
    localStorage.setItem('musicPlaying', musicPlaying);
}

/**
 * Toggles the background music on or off.
 * Updates the music state, mutes/unmutes all sounds,
 * and saves the state in local storage.
 */
function startStopMusic() {
    musicPlaying = !musicPlaying;
    soundManager.toggleMuteAll(!musicPlaying);
    if (musicPlaying) {
        soundManager.playSound('background');
    } else {
        soundManager.stopAllSounds();
    }
    saveMusicState();
}

/**
 * Loads and restores the music state from local storage when the window loads.
 */
window.onload = function () {
    let storedMusicState = localStorage.getItem('musicPlaying');
    if (storedMusicState !== null) {
        musicPlaying = storedMusicState === 'true';
    }
    soundManager.toggleMuteAll(!musicPlaying);
    if (musicPlaying) {
        soundManager.playSound('background');
    }
};

/**
 * Plays a specified game sound if music is enabled.
 * @param {string} sound - The name of the sound to play.
 */
function playGameSound(sound) {
    if (musicPlaying) {
        soundManager.playSound(sound);
    }
}

/**
 * Starts the game by initializing the world and hiding the start screen.
 */
function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        canvas = document.getElementById('canvas');
        initLevel();
        world = new World(canvas, keyboard);
        startScreen = document.getElementById('introScreen');
        startScreen.classList.add('d-none');
        canvas.classList.remove('d-none');
        hideMenuButtons();
        showMobileControls();
        showRightControls();
    }
}

/**
 * Zeigt den Endscreen und blendet die mobile Steuerung aus.
 * Die Menü-Buttons werden dabei wieder eingeblendet.
 * @param {string} type - Der Endscreen-Typ ('win' oder 'lose').
 */
function showEndScreen(type) {
    toggleEndScreen(type);
    removeOldButtons();
    createRestartButton();
    createHomeButton();
    hideMobileControls();
    showMenuButtons();
}

/**
 * Restarts the game by resetting the state, world, and character.
 */
function restartGame() {
    resetGameState();
    resetWorld();
    resetCharacter();
    restoreMusicState();
    startGame();
}

/**
 * Geht zum Startbildschirm zurück und blendet die mobile Steuerung aus.
 */
function goToHomeScreen() {
    hideMobileControls();
    showMenuButtons();
    location.reload();
}

/**
 * Removes old buttons from the end screen.
 */
function removeOldButtons() {
    let oldButtons = document.querySelector('.end-buttons');
    if (oldButtons) oldButtons.remove();
}

/**
 * Toggles fullscreen mode for the game elements.
 */
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

/**
 * Resets the game state to its initial state.
 */
function resetGameState() {
    gameRunning = false;
    document.querySelector('.end-buttons').remove();
    document.getElementById('introScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.querySelector('.buttons').style.display = 'block';
}

/**
 * Resets the game world by clearing intervals and reinitializing it.
 */
function resetWorld() {
    world.forceClearAllIntervals();
    soundManager.stopAllSounds();
    world = null;
    initLevel();
    world = new World(document.getElementById('canvas'), keyboard);
}

/**
 * Resets the character's state and position.
 */
function resetCharacter() {
    if (!(world.character instanceof Character)) {
        world.character = new Character();
    }
    world.character.energy = 100;
    world.character.lastHurtTime = null;
    world.character.speedY = 0;
    world.character.x = 100;
    world.character.y = 100;
}

/**
 * Toggles the visibility of the end screen.
 * @param {string} type - The type of end screen ('win' or 'lose').
 */
function toggleEndScreen(type) {
    let startScreen = document.getElementById('introScreen');
    let canvas = document.getElementById('canvas');
    startScreen.classList.remove('d-none');
    canvas.classList.add('d-none');
    let imagePath = type === 'win'
        ? 'img/9_intro_outro_screens/win/win_2.png'
        : 'img/9_intro_outro_screens/game_over/game over.png';
    startScreen.src = imagePath;
    document.querySelector('.buttons').style.display = 'none';
}

/**
 * Displays the game manual.
 */
function showManual() {
    const manualTemplate = getManualTemplate();
    document.getElementById("manualContainer").innerHTML = manualTemplate;
    document.getElementById("manualModal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

/**
 * Closes the game manual.
 */
function closeManual() {
    document.getElementById("manualContainer").innerHTML = "";
    document.getElementById("overlay").style.display = "none";
}

/**
 * Toggles fullscreen mode for the main game elements.
 */
function toggleFullScreen() {
    let elements = ['mainContent', 'introScreen', 'canvas'];
    elements.forEach(id => document.getElementById(id).classList.toggle('fullscreen'));
    hideElements();
}

/**
 * Hides unnecessary elements in fullscreen mode.
 */
function hideElements() {
    title = document.getElementsByTagName('h1')[0];
    title.classList.add('d-none');
    footer = document.querySelector('.footer');
    footer.classList.add('d-none');
}

/**
 * Checks the screen orientation and prompts the user to rotate if necessary.
 */
function checkOrientation() {
    let rotateMessage = document.getElementById('rotate-message');
    let mainContent = document.getElementById('mainContent');
    if (window.innerHeight <= 480) {
        toggleFullScreen();
    }
    if (window.innerWidth <= 720 && window.innerHeight > window.innerWidth) {
        rotateMessage.style.display = "flex";
        mainContent.style.display = "none";
    } else {
        rotateMessage.style.display = "none";
        mainContent.style.display = "flex";
    }
}

/**
 * Handles screen orientation changes.
 */
window.onload = checkOrientation;
window.addEventListener("resize", checkOrientation);

/**
 * Restores the music state from local storage.
 */
function restoreMusicState() {
    let storedMusicState = localStorage.getItem('musicPlaying');
    if (storedMusicState !== null) {
        musicPlaying = storedMusicState === 'true';
    }
    soundManager.toggleMuteAll(!musicPlaying);
    if (musicPlaying) {
        soundManager.playSound('background');
    }
}

/**
 * Sets the keyboard state for a given key.
 * @param {string} key - The key being pressed or released.
 * @param {boolean} state - The state of the key (true for pressed, false for released).
 */
function setKey(key, state) {
    keyboard[key] = state;
}

/**
 * Handles touch start events for mobile controls.
 * @param {Event} event - The touch event.
 * @param {string} key - The key associated with the touch event.
 */
function handleTouchStart(event, key) {
    event.preventDefault();
    setKey(key, true);
}

/**
 * Handles touch end events for mobile controls.
 * @param {Event} event - The touch event.
 * @param {string} key - The key associated with the touch event.
 */
function handleTouchEnd(event, key) {
    event.preventDefault();
    setKey(key, false);
}

/**
 * Handles touch cancel events for mobile controls.
 * @param {Event} event - The touch event.
 * @param {string} key - The key associated with the touch event.
 */
function handleTouchCancel(event, key) {
    event.preventDefault();
    setKey(key, false);
}

/**
 * Listens for key press events and updates the keyboard state accordingly.
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
});

/**
 * Listens for key release events and updates the keyboard state accordingly.
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
});