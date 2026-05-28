import { Level } from "./level.js";
import { UI } from "./ui/ui.js";

/** Mages the full game. */
export class Game { 
    #ui;
    #level;

    constructor() {
        this.#ui = new UI();
        this.#level = new Level(this.#ui.canvas.ctx);
    }
    // #region Methods
    /** Will be executed after create of game. */
    async init() {
        await this.#level.loadDrawings();
        this.#level.drawAll();
    }
    //#endregion
}