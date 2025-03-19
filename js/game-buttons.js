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
 * Blendet die mobile Steuerung für Links/Rechts ein (aber nicht die rechten Buttons!).
 */
function showMobileControls() {
    let controls = document.querySelector('.mobile-controls');
    if (controls) {
        controls.style.display = 'flex'; // Steuerung sichtbar machen
    }
}

/**
 * Blendet die gesamte mobile Steuerung aus (auf dem Startbildschirm oder Game Over).
 */
function hideMobileControls() {
    let controls = document.querySelector('.mobile-controls');
    let rightControls = document.querySelector('.right-controls');
    if (controls) controls.style.display = 'none';
    if (rightControls) rightControls.style.display = 'none';
}

/**
 * Blendet nur die "right-controls" ein, wenn das Spiel gestartet wurde.
 */
function showRightControls() {
    let rightControls = document.querySelector('.right-controls');
    if (rightControls) {
        rightControls.style.display = 'flex'; // Right-Controls erscheinen erst im Spiel
    }
}

/**
 * Blendet die drei Buttons (StartGame, Audio, Manual) aus, wenn das Spiel gestartet wird.
 */
function hideMenuButtons() {
    let buttons = document.querySelector('.buttons');
    if (buttons) {
        buttons.style.display = 'none';
    }
}

/**
 * Zeigt die drei Buttons (StartGame, Audio, Manual) wieder an, wenn das Spiel endet.
 */
function showMenuButtons() {
    let buttons = document.querySelector('.buttons');
    if (buttons) {
        buttons.style.display = 'flex';
    }
}