import { UI } from "./ui/ui.js";

/** Mages the full game. */
export class Game { 
    #ui;

    constructor() {
        this.#ui = new UI();
    }
}