/**
 * Manages all game sounds, including playback, stopping, and volume control.
 */
class SoundManager {
    /**
 * Initializes the SoundManager and loads all game sounds.
 */
    constructor() {
        this.sounds = {};
        soundList.forEach(sound => this.addSound(sound, `audio/${sound}.mp3`, soundVolumes[sound]));
    }

    /**
 * Adds a new sound to the manager.
 * @param {string} name - The name of the sound.
 * @param {string} filePath - The file path to the audio file.
 * @param {number} [volume=1.0] - The volume level of the sound (default is 1.0).
 */
    addSound(name, filePath, volume = 1.0) {
        this.sounds[name] = new Audio(filePath);
        this.sounds[name].volume = volume;
        this.sounds[name].loop = name === 'background';
        this.sounds[name].muted = true;
    }

    /**
 * Stops all currently playing sounds.
 */
    stopAllSounds() {
        for (let sound in this.sounds) {
            if (sound !== 'background') {
                this.stopSound(sound);
            }
        }
    }

    /**
 * Stops a specific sound if it is currently playing.
 * @param {string} name - The name of the sound to stop.
 */
    stopSound(name) {
        if (this.sounds[name]) {
            this.sounds[name].pause();
            this.sounds[name].currentTime = 0;
        }
    }

    /**
 * Plays a sound if music is enabled and it is not already playing.
 * @param {string} name - The name of the sound to play.
 */
    playSound(name) {
        if (!musicPlaying) return;
        if (this.sounds[name]) {
            if (name === 'background' && !this.sounds[name].paused) return;
            this.sounds[name].play();
        }
    }

    /**
 * Toggles the mute state for all sounds.
 * @param {boolean} mute - If true, all sounds are muted; if false, they are unmuted.
 */
    toggleMuteAll(mute) {
        Object.values(this.sounds).forEach(sound => sound.muted = mute);
    }
}