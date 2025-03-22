/**
 * Creates a restart button on the end screen.
 */
function createRestartButton() {
    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('end-buttons');
    let restartButton = document.createElement('button');
    restartButton.innerText = '🔄 Restart';
    restartButton.classList.add('restart-button');
    restartButton.onclick = restartGame;
    buttonContainer.appendChild(restartButton);
    document.getElementById('introScreen').parentNode.appendChild(buttonContainer);
}

/** Creates a home button on the end screen. */
function createHomeButton() {
    let buttonContainer = document.querySelector('.end-buttons');
    if (!buttonContainer) {
        buttonContainer = document.createElement('div');
        buttonContainer.classList.add('end-buttons');
        document.getElementById('introScreen').parentNode.appendChild(buttonContainer);
    }
    let homeButton = document.createElement('button');
    homeButton.innerText = '🏠 Home';
    homeButton.classList.add('home-button');
    homeButton.onclick = goToHomeScreen;
    buttonContainer.appendChild(homeButton);
}

/**
* Shows the mobile left/right controls (but not the right buttons!).
*/
function showMobileControls() {
    let controls = document.querySelector('.mobile-controls');
    if (controls) {
        controls.style.display = 'flex'; // Steuerung sichtbar machen
    }
}

/**
* Hides all mobile controls (on the home screen or Game Over).
*/
function hideMobileControls() {
    let controls = document.querySelector('.mobile-controls');
    let rightControls = document.querySelector('.right-controls');
    if (controls) controls.style.display = 'none';
    if (rightControls) rightControls.style.display = 'none';
}

/**
* Only displays the right controls when the game is started.
*/
function showRightControls() {
    let rightControls = document.querySelector('.right-controls');
    if (rightControls) {
        rightControls.style.display = 'flex'; // Right-Controls erscheinen erst im Spiel
    }
}

/**
* Hides the three buttons (StartGame, Audio, Manual) when the game starts.
*/
function hideMenuButtons() {
    let buttons = document.querySelector('.buttons');
    if (buttons) {
        buttons.style.display = 'none';
    }
}

/**
* Displays the three buttons (StartGame, Audio, Manual) again when the game ends.
*/
function showMenuButtons() {
    let buttons = document.querySelector('.buttons');
    if (buttons) {
        buttons.style.display = 'flex';
    }
}