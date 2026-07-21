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

    /** Shows all control buttons exclude menu-button. */
    showControlButtons() {
        Object.values(this.ctrlBtns).forEach(btn => btn.visible = btn instanceof MenuButton ? false : true);
    }

    /** Hides all control butttons. */
    hideControlButtons() {
        Object.values(this.ctrlBtns).forEach(btn => btn.visible = false);
    }

    /** Shows Try again and Menu - Button */
    showAfterGameButtons() {
        Object.values(this.ctrlBtns).slice(0,2).forEach(btn => btn.visible = true);
    }
    // #endregion
}