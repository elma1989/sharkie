import { Canvas } from "./canvas.js";

export class UI {
    #canvas;

    constructor() {
        this.#canvas = new Canvas();
    }

    get canvas() { return this.#canvas; }
}