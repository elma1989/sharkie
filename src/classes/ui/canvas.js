import { GameConfig } from "../game-config.js";

/** Canvas-Elment, on which game will be drawn. */
export class Canvas {
    /**
     * Context of canvas.
     * @type {CanvasRenderingContext2D?}
     */
    #ctx = null;

    constructor() {
        const element = document.getElementById('canvas');
        if (element) {
            this.#ctx = element.getContext('2d');
            element.width = GameConfig.WIDTH;
            element.height = GameConfig.HEIGHT;
        }
    }

    get ctx() { return this.#ctx; }
}