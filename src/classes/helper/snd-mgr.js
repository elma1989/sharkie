import { sounds } from "./sounds.js";

/** Manages the sound. */
export class SoundManager {
    #ctx;
    #masterGain;
    #musicGain;
    #sfxGain;
    #buffers;
    #music;
    #sfx;

    constructor() {
        this.#ctx = new AudioContext();
        this.#buffers = {};
        this.#music = this.loadStorage('music');
        this.#sfx = this.loadStorage('sfx');
        this.initGain();
    }

    get music() { return this.#music; }

    set music(state) {
        if (typeof state != 'boolean') return;
        this.#music = state;
        this.saveStorage();
        this.onChangeMusic?.(state);
    }

    get sfx() { return this.#sfx; };

    set sfx(state) {
        if (typeof state != 'boolean') return;
        this.#sfx = state;
        this.saveStorage();
        this.onChangeSfx?.(state);
    }

    /** Sets default values for gain. */
    initGain() {
        this.#masterGain = this.#ctx.createGain();
        this.#musicGain = this.#ctx.createGain();
        this.#sfxGain = this.#ctx.createGain();

        this.#musicGain.connect(this.#masterGain);
        this.#sfxGain.connect(this.#masterGain);
        this.#masterGain.connect(this.#ctx.destination);

        this.#musicGain.gain.value = 0.3;
    }

    // #region Storage
    /** Saves in local storage. */
    saveStorage() {
        localStorage.setItem('sound', JSON.stringify({music: this.music, sfx: this.sfx}));
    }

    /**
     * Loads from storage.
     * @param {string} name - Name of entrie
     * @returns {boolean} True, if enabled
     */
    loadStorage(name) {
        const sound = JSON.parse(localStorage.getItem('sound'));
        if (!sound || !Object.keys(sound).includes(name)) return true;
        return sound[name];
    }
    // #endregion

    // #region Load
    /**
     * Gets url for file.
     * @param {string} file - Name of file
     * @returns {string} Url for host.
     */
    url(file) {
        const host = location.hostname;
        const path = '/assets/sounds/';
        const flaskPath = '/projects/sharkie' + path;
        if (host == 'localhost' || host == '127.0.0.1' ) {
            if (location.port == '8080') return path + file;
            return flaskPath + file;
        }
        if (host.endsWith('developerakademie.net')) return '/sharkie' + path + file;
        return flaskPath + file;
    }

    /**
     * Preloads a sound from url.
     * @param {string} url - URL of sound.
     * @returns {Pormise<null | AudioBuffer>} null, if url not found.
     */
    async preloadSound(url) {
        const resp = await fetch(url);
        if (!resp.ok) {
            return null;
        }
        const arrayBuffer = await resp.arrayBuffer();
        return this.#ctx.decodeAudioData(arrayBuffer);
    }

    /** Preloads all sounds. */
    async preloadAllSounds() {
        const entries = await Promise.all(Object.entries(sounds).map(async ([key, url]) => [
            key,
            await this.preloadSound(this.url(url))
        ]));
        this.#buffers = Object.fromEntries(entries);
    }
    // #endregion

    /** Enables sound by user. */
    async enable() {
        if (this.#ctx.state != 'suspended') return;
        await this.#ctx.resume();
    }

    // #region Manager-Methods
    /**
     * Plays a sound.
     * @param {string} name - Name of sound in map.
     * @returns {{stop: fuction}}
     */
    play(name) {
        if (!this.sfx && name != 'music' || !this.music && name == 'music' || !Object.keys(this.#buffers).includes(name)) return null;
        const buffer = this.#buffers[name];
        if (!buffer) return null;

        const src = this.#ctx.createBufferSource();
        const gain = name == 'music' ? this.#musicGain : this.#sfxGain;
        src.buffer = buffer;
        src.connect(gain);
        src.start();
        return {stop: () => src.stop()};
    }
    // #endregion
}