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
        await this.#sndMgr.loadIconButtons();
        await this.#sndMgr.preloadAllSounds();
        this.#ui.enambleRunButton('Start');
    }

    async #secondPrepare() {
        this.#ui.disableRunButton();
        this.#ui.showAfterGameButtons();
        this.#level = new Level(this.#ui.canvas.ctx, this.#ctrl, this.#sndMgr);
        this.#addEndGameEvent();
        await this.#level.loadLevel();
        this.#ui.enambleRunButton('Try again');
    }

    async #startGame() {
        this.#ui.closeOverlay('hero');
        this.#ui.hideControlButtons();
        this.#ui.start();
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

    #addEvents() {
        this.#addButtonEvents();
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

    #addEndGameEvent() {
        this.#level.onEndGame = () => {
            if (this.#music) {
                this.#music.stop();
                this.#music = null;
            }
            this.#sndMgr.hideBar();
            this.#ui.stop();
            this.#secondPrepare();
        }
    }
    //#endregion
}