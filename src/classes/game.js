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

    async #secondPrepare() {
        this.#ui.disableRunButton();
        this.#ui.showAfterGameButtons();
        this.#level = new Level(this.#ctrl, this.#sndMgr, this.#ui.canvas.ctx);
        this.#addEndGameEvent();
        await this.#level.loadLevel();
    }

    // #region Events
    #addEvents() {
        this.#addSoundEvents();
        this.#addEndGameEvent();
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
    // #endregion
    // #endregion
}