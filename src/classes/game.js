import { Control } from "./helper/control.js";
import { Keyboard } from "./helper/keyboard.js";
import { SoundManager } from "./helper/snd-mgr.js";
import { Level } from "./level.js";
import { UI } from "./ui/ui.js";

/** Mages the full game. */
export class Game { 
    #ui;
    #ctrl;
    #level;
    #sndMgr;
    #music;
    #ready = false;

    constructor() {
        this.#ctrl = new Control();
        new Keyboard(this.#ctrl);
        this.#ui = new UI();
        this.#sndMgr = new SoundManager();
        this.#ui.setSndButton('music', this.#sndMgr.music);
        this.#ui.setSndButton('sfx', this.#sndMgr.sfx);
        this.#level = new Level(this.#ctrl, this.#sndMgr, this.#ui.canvas.ctx);
        this.#addEvents();
    }

    // #region Methods
    /** Will be executed after create of game. */
    async init() {
        await Promise.all([
            this.#level.loadLevel(),
            this.#sndMgr.preloadAllSounds()
        ]);
        this.#ui.enableRunButton('start');
        this.#ready = true;
    }

    /** Prepares the second or more run. */
    async #secondPrepare() {
        this.#ready = false;
        this.#ui.disableRunButton();
        this.#ui.showAfterGameButtons();
        this.#level = new Level(this.#ctrl, this.#sndMgr, this.#ui.canvas.ctx);
        this.#addEndGameEvent();
        await this.#level.loadLevel();
        this.#ui.enableRunButton('Try again');
        this.#ready = true;
    }

    async #startGame() {
        if (!this.#ready) return;
        await this.#sndMgr.enable();
        if (this.#sndMgr.music) this.#music = this.#sndMgr.play('music');
        this.#ui.hideMainButtons();
        this.#ui.closeOverlay('hero');
        this.#ui.showSndBtns();
        this.#level.start();
    }

    // #region Sound-Management
    /**
     * Sets music state.
     * @param {boolean} state - True for on, false for off.
     */
    #setMusic(state) {
        this.#ui.setSndButton('music', state);
        this.#sndMgr.music = state;
        if (state) this.#music = this.#sndMgr.play('music');
        else if (this.#music) {
            this.#music.stop();
            this.#music = null;
        }
    }

    /**
     * Sets SFX-state.
     * @param {boolean} state - True for on and false for off.
     */
    #setSfx(state) {
        this.#ui.setSndButton('sfx', state);
        this.#sndMgr.sfx = state;
    }

    /** Turns music on and off. */
    #toggleMusic() {
        this.#setMusic(!this.#sndMgr.music);
    }

    /** Turns SFX on and off. */
    #toggleSfx() {
        this.#setSfx(!this.#sndMgr.sfx);
    }
    // #endregion

    // #region Events
    /** Adds all events for main buttons and close overlay buttons. */
    #addRunButtonEvent() {
        this.#ui.btns.main.run.addEventListener('pointerdown', () => this.#startGame());
    }

    /** Adds events for sound buttons. */
    #addSoundEvents() {
        this.#ui.btns.snd.music.addEventListener('pointerdown', () => this.#toggleMusic());
        this.#ui.btns.snd.sfx.addEventListener('pointerdown', () => this.#toggleSfx());
    }

    #addEndGameEvent() {
        this.#level.onEndGame = () => {
            if (this.#music) {
                this.#music.stop();
                this.#music = null;
            }
            this.#ui.hideSndBtns();
            this.#ui.stop();
            this.#secondPrepare();
        }
    }

    #addEvents() {
        this.#addRunButtonEvent();
        this.#addSoundEvents();
        this.#addEndGameEvent();
    }
    // #endregion
    // #endregion
}