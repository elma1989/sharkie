import { TextButton } from "../abstract/button-text.js";
import { Overlay } from "../abstract/overlay.js";
import { ControlsCloseButton } from "./btn-close-ctrl.js";
import { ControlsButton } from "./btn-controls.js";
import { MenuButton } from "./btn-menu.js";
import { RunButton } from "./btn-run.js";
import { Canvas } from "./canvas.js";
import { ControlsOverlay } from "./overlay-controls.js";

export class UI {
    #canvas;
    #controlButtons;
    #closeButtons;
    #overlays;

    constructor() {
        this.#canvas = new Canvas();
        this.#controlButtons = this.#createControlButtons();
        this.#overlays = this.#createOverlays();
        this.#closeButtons = this.#createCloseButtons();
    }

    get canvas() { return this.#canvas; }

    get ctrlBtns() { return this.#controlButtons; }

    get closeBtns() { return this.#closeButtons; }

    get overlays() { return this.#overlays; }

    /**
     * Creates all control buttons.
     * @returns {Object.<string, TextButton>} All control buttons.
     */
    #createControlButtons() {
        return {
            run: new RunButton(),
            menu: new MenuButton(),
            controls: new ControlsButton()
        }
    }

    #createOverlays() {
        return {
            ctrl: document.querySelector('overlay-controls')
        }
    }

    #createCloseButtons() {
        return {
            ctrl: new ControlsCloseButton()
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

    // #region Overlay-Control
    /**
     * Opens an overlay.
     * @param {string} name - Name of overlay
     */
    openOverlay(name) {
        if (!Object.keys(this.overlays).includes(name)) return;
        this.hideControlButtons();
        this.overlays[name].show();
    }

    /**
     * Closes an overlay.
     * @param {string} name - Name of overlay.
     */
    closeOverlay(name) {
        if (!Object.keys(this.overlays).includes(name)) return;
        this.overlays[name].hide();
        this.showControlButtons();
    }
    // #endregion
}