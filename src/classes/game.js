import { Control } from "./helper/control.js";
import { Keyboard } from "./helper/keyboard.js";
import { Level } from "./level.js";
import { UI } from "./ui/ui.js";

/** Mages the full game. */
export class Game { 
    #ui;
    #ctrl;
    #level;

    constructor() {
        this.#ui = new UI();
        this.#ctrl = new Control();
        new Keyboard(this.#ctrl);
        this.#level = new Level(this.#ui.canvas.ctx, this.#ctrl);
    }
    // #region Methods
    /** Will be executed after create of game. */
    async init() {
        this.#addEvents();
        await this.#level.loadTitle();
        this.#level.drawTitleScreen()
        await this.#level.loadDrawings();
        this.#ui.enambleRunButton('Start');
    }

    async #secondPrepare() {
        this.#ui.disableRunButton();
        this.#ui.showAfterGameButtons();
        this.#level = new Level(this.#ui.canvas.ctx, this.#ctrl);
        await this.#level.loadTitle();
        this.#addEndGameEvent();
        await this.#level.loadDrawings();
        this.#ui.enambleRunButton('Try again');
    }

    #startGame() {
        this.#level.removeTitleScreen();
        this.#ui.hideControlButtons();
        this.#level.bringEnemiesToLife();
        this.#level.gameLoop(0);
    }

    #showMain() {
        this.#level.drawTitleScreen();
        this.#ui.ctrlBtns.run.description = 'Start';
        this.#ui.showControlButtons()
    }

    #addEvents() {
        this.#addButtonEvents();
        this.#addEndGameEvent();
    }

    #addButtonEvents() {
        this.#ui.ctrlBtns.run.onPointerDown = () => this.#startGame();
        this.#ui.ctrlBtns.menu.onPointerDown = () => this.#showMain();
        this.#ui.ctrlBtns.controls.onPointerDown = () => this.#ui.openOverlay('ctrl');
        this.#ui.ctrlBtns.rules.onPointerDown = () => this.#ui.openOverlay('rules');

        this.#ui.closeBtns.ctrl.onPointerDown = () => this.#ui.closeOverlay('ctrl');
        this.#ui.closeBtns.rules.onPointerDown = () => this.#ui.closeOverlay('rules');
    }

    #addEndGameEvent() {
        this.#level.onEndGame = () => this.#secondPrepare();
    }
    //#endregion
}