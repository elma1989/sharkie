import { Level } from "./level.js";
import { Water } from "./model/water.js";
import { UI } from "./ui/ui.js";

/** Mages the full game. */
export class Game { 
    #ui;
    #level;

    constructor() {
        this.#ui = new UI();
        this.#level = new Level();
    }
    // #region Methods
    /** Will be executed after create of game. */
    async init() {
        await this.#level.loadDrawings();
        this.#level.drawAll();
    }
    //#endregion
}