/**
 * Generates the HTML template for the game manual.
 * This template provides an overview of the game controls.
 * @returns {string} - The HTML structure of the manual as a string.
 */
function getManualTemplate() {
    return `
        <div id="manualModal" class="modal">
            <h2>Spielsteuerung</h2>
            <p>◀ Links: <b>Linke Richtungstaste</b></p>
            <p>▶ Rechts: <b>Rechte Richtungstaste</b></p>
            <p>⬜ Springen: <b>Space/Leertaste</b></p>
            <p>🍾 Flaschen werfen: <b>Taste D</b></p>
            <button class="close-btn" onclick="closeManual()">Schließen</button>
        </div>
    `;
}