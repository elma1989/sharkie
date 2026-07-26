import { sounds } from "./sounds.js";

export class SoundManager {
    #ctx;
    #masterGain;
    #musicGain;
    #effectGain;
    #buffers;

    constructor() {
        this.#ctx = new AudioContext();
        this.#buffers = {};

        this.#masterGain = this.#ctx.createGain();
        this.#musicGain = this.#ctx.createGain();
        this.#effectGain = this.#ctx.createGain();

        this.#musicGain.connect(this.#masterGain);
        this.#effectGain.connect(this.#masterGain);
        this.#masterGain.connect(this.#ctx.destination);

        this.#musicGain.gain.value = 0.3;
    }

    /**
     * Gets url for file.
     * @param {string} file - Name of file
     * @returns {string} Url for host.
     */
    #url(file) {
        const host = window.location.hostname;
        const path = '/assets/sounds/';
        if (host == 'localhost' || host == '127.0.0.1' ) return path + file;
        if (host.endsWith('developer-akademie.net')) return '/sharkie' + path + file;
        return '/static/sharkie' + path + file;
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
            await this.preloadSound(this.#url(url))
        ]));
        this.#buffers = Object.fromEntries(entries);
    }

    /** Enables sound by user. */
    async enable() {
        if (this.#ctx.state != 'suspended') return;
        await this.#ctx.resume();
    }

    /**
     * Plays a sound.
     * @param {string} name - Name of sound in map.
     * @returns {{stop: fuction}}
     */
    play(name) {
        if (!Object.keys(this.#buffers).includes(name)) return null;
        const buffer = this.#buffers[name];
        if (!buffer) return null;

        const src = this.#ctx.createBufferSource();
        const gain = name == 'music' ? this.#musicGain : this.#effectGain;
        src.buffer = buffer;
        src.connect(gain);
        src.start();
        return {stop: () => src.stop()};
    }
}