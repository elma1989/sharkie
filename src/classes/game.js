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
        this.#ui = new UI();
        this.#ctrl = new Control();
        new Keyboard(this.#ctrl);
        this.#sndMgr = new SoundManager();
        this.#level = new Level(this.#ctrl, this.#sndMgr, this.#ui.canvas.ctx);
    }

    // #region Methods
    /** Will be executed after create of game. */
    async init() {
        this.#addEvents();
        await this.#level.loadLevel();
        await this.#ui.loadMobileControlButtons();
        await this.#sndMgr.loadIconButtons();
        await this.#sndMgr.preloadAllSounds();
        this.#ui.enambleRunButton('Start');
    }

    async #secondPrepare() {
        this.#ui.disableRunButton();
        this.#ui.showAfterGameButtons();
        this.#level = new Level(this.#ctrl, this.#sndMgr, this.#ui.canvas.ctx);
        this.#addEndGameEvent();
        await this.#level.loadLevel();
        this.#ui.enambleRunButton('Try again');
    }

    async #startGame() {
        this.#ui.closeOverlay('hero');
        this.#ui.hideControlButtons();
        this.#ui.start();
        this.#ui.checkMobileControl();
        await this.#sndMgr.enable();
        this.#music = this.#sndMgr.play('music');
        this.#sndMgr.showBar();
        this.#level.start();
    }

    #showMain() {
        this.#ui.ctrlBtns.run.description = 'Start';
        this.#ui.openOverlay('hero');
        this.#ui.showControlButtons()
    }

    // #region Events
    #addEvents() {
        this.#addButtonEvents();
        this.#addMobCtrlEvents();
        this.#addSoundEvents();
        this.#addEndGameEvent();
    }

    #addButtonEvents() {
        this.#ui.ctrlBtns.run.onPointerDown = () => this.#startGame();
        this.#ui.ctrlBtns.menu.onPointerDown = () => this.#showMain();
        this.#ui.ctrlBtns.controls.onPointerDown = () => this.#ui.openOverlay('ctrl');
        this.#ui.ctrlBtns.rules.onPointerDown = () => this.#ui.openOverlay('rules');
        this.#ui.ctrlBtns.inprint.onPointerDown = () => this.#ui.openOverlay('inprint')

        this.#ui.closeBtns.ctrl.onPointerDown = () => this.#ui.closeOverlay('ctrl');
        this.#ui.closeBtns.rules.onPointerDown = () => this.#ui.closeOverlay('rules');
        this.#ui.closeBtns.inprint.onPointerDown = () => this.#ui.closeOverlay('inprint');
    }

    #addSoundEvents() {
        this.#sndMgr.onChangeMusic = (state) => {
            if (state) this.#music = this.#sndMgr.play('music');
            else if (this.#music) {
                this.#music.stop();
                this.#music = null;
            }
        }
    }

    /**
     * Turns mobile control buttons on and off.
     * @param {string} name - Name of Button.
     * @param {boolean} state - Active-state for button.
     */
    #handleMobCtrlButton(name, state) {
        this.#ui.mobCtrlBtns[name].active = state;
        this.#ctrl.ctrl[name] = state;
    }

    #addMobCtrlEvents() {
        this.#ui.mobCtrlBtns.left.onPointerDown = () => this.#handleMobCtrlButton('left', true);
        this.#ui.mobCtrlBtns.left.onPointerUp = () => this.#handleMobCtrlButton('left', false);
        this.#ui.mobCtrlBtns.right.onPointerDown = () => this.#handleMobCtrlButton('right', true);
        this.#ui.mobCtrlBtns.right.onPointerUp = () => this.#handleMobCtrlButton('right', false);
    }

    #addEndGameEvent() {
        this.#level.onEndGame = () => {
            if (this.#music) {
                this.#music.stop();
                this.#music = null;
            }
            this.#sndMgr.hideBar();
            this.#ui.stop();
            this.#ui.checkMobileControl();
            this.#secondPrepare();
        }
    }
    // #endregion
    // #endregion
}