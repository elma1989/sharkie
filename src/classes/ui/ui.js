import { MenuButton } from "./btn-menu.js";
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
            run: new RunButton(),
            menu: new MenuButton()
        }
    }

    // #region Button-Control
    /**
     * Enables Run-Button.
     * @param {string} description - Text on button after disable-state.
     */
    enambleRunButton(description) {
        this.ctrlBtns.run.disabled = false;
        this.ctrlBtns.run.description = description;
    }

    /** Disables run button. */
    disableRunButton() {
        this.ctrlBtns.run.disabled = true;
        this.ctrlBtns.run.description = 'LOADING';
    }

    /**
     * Shows and hides all control buttons.
     * @param {boolean} view true = show buttons, false = Hide buttons.
     */
    switchControlButtons(view) {
        Object.keys(this.ctrlBtns).map(btn => this.ctrlBtns[btn]).forEach(btn => btn.visible = view);
    }
    // #endregion
}