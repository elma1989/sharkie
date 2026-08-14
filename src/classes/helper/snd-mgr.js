import { MusicButton } from "../ui/btn-music.js";
import { SfxButton } from "../ui/btn-sfx.js";
import { sounds } from "./sounds.js";

export class SoundManager {
    #ctx;
    #masterGain;
    #musicGain;
    #sfxGain;
    #buffers;
    #ctrl;
    #sndBar;
    #music;
    #sfx;

    constructor() {
        this.#ctx = new AudioContext();
        this.#buffers = {};
        this.#ctrl = {
            music: new MusicButton(),
            sfx: new SfxButton()
        }
        this.#music = this.#loadStorage('music');
        this.#sfx = this.#loadStorage('sfx');
        this.#sndBar = document.querySelector('.snd-ctrl');

        this.#initGain();
        this.#addEvents();
    }

    get music() { return this.#music; }

    set music(state) {
        if (typeof state != 'boolean') return;
        this.#music = state;
        this.#saveStorage();
        this.onChangeMusic?.(state);
    }

    get sfx() { return this.#sfx; };

    set sfx(state) {
        if (typeof state != 'boolean') return;
        this.#sfx = state;
        this.#saveStorage();
        this.onChangeSfx?.(state);
    }

    #initGain() {
        this.#masterGain = this.#ctx.createGain();
        this.#musicGain = this.#ctx.createGain();
        this.#sfxGain = this.#ctx.createGain();

        this.#musicGain.connect(this.#masterGain);
        this.#sfxGain.connect(this.#masterGain);
        this.#masterGain.connect(this.#ctx.destination);

        this.#musicGain.gain.value = 0.3;
    }

    // #region Events
    #addPointerEvents() {
        this.#ctrl.music.onPointerDown = () => this.#ctrl.music.toggle();
        this.#ctrl.sfx.onPointerDown = () => this.#ctrl.sfx.toggle();
    }

    #addChangeEvents() {
        this.#ctrl.music.onChange = (state) => this.music = state;
        this.#ctrl.sfx.onChange = (state) => this.sfx = state;
    }

    #addEvents() {
        this.#addPointerEvents();
        this.#addChangeEvents();
    }
    // #endregion

    // #region Storage
    /** Saves in local storage. */
    #saveStorage() {
        localStorage.setItem('sound', JSON.stringify({music: this.music, sfx: this.sfx}));
    }

    /**
     * Loads from storage.
     * @param {string} name - Name of entrie
     * @returns {boolean} True, if enabled
     */
    #loadStorage(name) {
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
    #url(file) {
        const host = window.location.hostname;
        const path = '/assets/sounds/';
        if (host == 'localhost' || host == '127.0.0.1' ) return path + file;
        if (host.endsWith('developerakademie.net')) return '/sharkie' + path + file;
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

    /** Shows the soundbar. */
    showBar() {
        this.#sndBar.classList.remove('d-none');
    }

    /** Hides the soundbar. */
    hideBar() {
        this.#sndBar.classList.add('d-none');
    }
    // #endregion
}