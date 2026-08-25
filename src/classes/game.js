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
        this.#ui.setButton('snd', 'music', this.#sndMgr.music);
        this.#ui.setButton('snd', 'sfx', this.#sndMgr.sfx);
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
        this.#ui.showMobCtrlButtons();
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
        this.#ui.setButton('snd', 'music', state);
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
        this.#ui.setButton('snd','sfx', state);
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
    /**
     * Changes controls states for button and control.
     * @param {string} name - Name of control.
     * @param {boolean} state - True for on and false for off.
     */
    #handleMobButton(name, state) {
        this.#ui.setButton('mobctrl', name, state);
        this.#ctrl.setCtrl(name, state);
    }

    /** Adds all events for main buttons and close overlay buttons. */
    #addRunButtonEvent() {
        this.#ui.btns.main.run.addEventListener('click', () => this.#startGame());
    }

    /** Adds events for sound buttons. */
    #addSoundEvents() {
        this.#ui.btns.snd.music.addEventListener('click', () => this.#toggleMusic());
        this.#ui.btns.snd.sfx.addEventListener('click', () => this.#toggleSfx());
    }

    /** Adds events for mobile control buttons. */
    #addMobCtrlEvents() {
        this.#ui.btns.mobctrl.left.addEventListener('touchstart', () => this.#handleMobButton('left', true));
        this.#ui.btns.mobctrl.left.addEventListener('touchend', () => this.#handleMobButton('left', false));
        this.#ui.btns.mobctrl.right.addEventListener('touchstart', () => this.#handleMobButton('right', true));
        this.#ui.btns.mobctrl.right.addEventListener('touchend', () => this.#handleMobButton('right', false));
        this.#ui.btns.mobctrl.up.addEventListener('touchstart', () => this.#handleMobButton('up', true));
        this.#ui.btns.mobctrl.up.addEventListener('touchend', () => this.#handleMobButton('up', false));
        this.#ui.btns.mobctrl.down.addEventListener('touchstart', () => this.#handleMobButton('down', true));
        this.#ui.btns.mobctrl.down.addEventListener('touchend', () => this.#handleMobButton('down', false));
        this.#ui.btns.mobctrl.attackBubble.addEventListener('touchstart', () => this.#handleMobButton('attackBubble', true));
        this.#ui.btns.mobctrl.attackBubble.addEventListener('touchend', () => this.#handleMobButton('attackBubble', false));
        this.#ui.btns.mobctrl.attackSlap.addEventListener('touchstart', () => this.#handleMobButton('attackSlap', true));
        this.#ui.btns.mobctrl.attackSlap.addEventListener('touchend', () => this.#handleMobButton('attackSlap', false));
    }

    /** Adds events for end of game. */
    #addEndGameEvent() {
        this.#level.onEndGame = () => {
            if (this.#music) {
                this.#music.stop();
                this.#music = null;
            }
            this.#ui.hideSndBtns();
            this.#ui.hideMobCtrlButtons();
            this.#ui.stop();
            this.#secondPrepare();
        }
    }

    #addEvents() {
        this.#addRunButtonEvent();
        this.#addSoundEvents();
        this.#addMobCtrlEvents();
        this.#addEndGameEvent();
    }
    // #endregion
    // #endregion
}