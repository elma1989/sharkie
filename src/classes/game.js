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
    }

    /** Prepares the second or more run. */
    async #secondPrepare() {
        this.#ui.showAfterGameButtons();
        this.#level = new Level(this.#ctrl, this.#sndMgr, this.#ui.canvas.ctx);
        this.#addEndGameEvent();
        await this.#level.loadLevel();
    }

    async #startGame() {
        await this.#sndMgr.enable();
        if (this.#sndMgr.music) this.#music = this.#sndMgr.play('music');
        this.#ui.start();
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
     * @param {TouchEvent} event - Event from event listener.
     * @param {string} name - Name of control.
     * @param {boolean} state - True for on and false for off.
     */
    #handleMobButton(event, name, state) {
        if(event.cancelable) event.preventDefault();
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
        this.#ui.btns.mobctrl.left.addEventListener('touchstart', (e) => this.#handleMobButton(e, 'left', true));
        this.#ui.btns.mobctrl.left.addEventListener('touchend', (e) => this.#handleMobButton(e, 'left', false));
        this.#ui.btns.mobctrl.right.addEventListener('touchstart', (e) => this.#handleMobButton(e, 'right', true));
        this.#ui.btns.mobctrl.right.addEventListener('touchend', (e) => this.#handleMobButton(e, 'right', false));
        this.#ui.btns.mobctrl.up.addEventListener('touchstart', (e) => this.#handleMobButton(e, 'up', true));
        this.#ui.btns.mobctrl.up.addEventListener('touchend', (e) => this.#handleMobButton(e,'up', false));
        this.#ui.btns.mobctrl.down.addEventListener('touchstart', (e) => this.#handleMobButton(e, 'down', true));
        this.#ui.btns.mobctrl.down.addEventListener('touchend', (e) => this.#handleMobButton(e, 'down', false));
        this.#ui.btns.mobctrl.attackBubble.addEventListener('touchstart', (e) => this.#handleMobButton(e, 'attackBubble', true));
        this.#ui.btns.mobctrl.attackBubble.addEventListener('touchend', (e) => this.#handleMobButton(e, 'attackBubble', false));
        this.#ui.btns.mobctrl.attackSlap.addEventListener('touchstart', (e) => this.#handleMobButton(e, 'attackSlap', true));
        this.#ui.btns.mobctrl.attackSlap.addEventListener('touchend', (e) => this.#handleMobButton(e, 'attackSlap', false));
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
            this.#ui.setRunButtonName('Try again');
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