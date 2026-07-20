import { RunButton } from "./btn-run.js";
import { Canvas } from "./canvas.js";

export class UI {
    #canvas;
    #controlButtons;

    constructor() {
        this.#canvas = new Canvas();
        this.#controlButtons = this.#createControlButtons();
    }

    get canvas() { return this.#canvas; }

    get ctrlBtns() { return this.#controlButtons; }

    #createControlButtons() {
        return {
            run: new RunButton()
        }
    }

}