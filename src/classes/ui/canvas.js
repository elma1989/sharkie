import { GameConfig } from "../game-config.js";
import { HTMLCustomElement } from "../abstract/custom-element.js";

export class Canvas extends HTMLCustomElement {
    #ctx;

    constructor() {
        super('canvas');
        const canvas = this.element;
        if (canvas) {
            canvas.width = GameConfig.WIDTH;
            canvas.height = GameConfig.HEIGHT;
            this.#ctx = canvas.getContext('2d');
        }
    }

    get ctx() { return this.#ctx; }
}