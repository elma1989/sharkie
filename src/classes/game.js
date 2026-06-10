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
        await this.#level.loadDrawings();
        this.#level.gameLoop(0);
    }
    //#endregion
}