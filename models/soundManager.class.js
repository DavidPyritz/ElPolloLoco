class SoundManager {
    constructor() {
        this.sounds = {};
    }
    addSound(name, filePath, volume = 1.0) {
        const sound = new Audio(filePath);
        sound.volume = volume;
        sound.loop = name === 'background';
        this.sounds[name] = sound;
    }
    stopAllSounds() {
        for (let sound in this.sounds) {
            this.stopSound(sound);
        }
    }
    stopSound(name) {
        if (this.sounds[name]) {
            this.sounds[name].pause();
            this.sounds[name].currentTime = 0;
        }
    }
    playSound(name) {
        if (this.sounds[name] && this.sounds[name].paused) {
            this.sounds[name].play();
        }
    }
}
