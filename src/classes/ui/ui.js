import { TextButton } from "../abstract/button-text.js";
import { Overlay } from "../abstract/overlay.js";
import { ControlsCloseButton } from "./btn-close-ctrl.js";
import { ImpressumCloseButton } from "./btn-close-impressum.js";
import { RulesCloseButton } from "./btn-close-rules.js";
import { ControlsButton } from "./btn-controls.js";
import { ImpressumButton } from "./btn-impressum.js";
import { MenuButton } from "./btn-menu.js";
import { RulesButton } from "./btn-rules.js";
import { RunButton } from "./btn-run.js";
import { Canvas } from "./canvas.js";
import { ControlsOverlay } from "./overlay-controls.js";

export class UI {
    #canvas;
    #controlButtons;
    #closeButtons;
    #overlays;
    #running = false;
    #resizeTimer;

    constructor() {
        this.#canvas = new Canvas();
        this.#controlButtons = this.#createControlButtons();
        this.#overlays = this.#createOverlays();
        this.#closeButtons = this.#createCloseButtons();
        this.#checkPortait();
        this.#addResizeEvent();
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
            controls: new ControlsButton(),
            rules: new RulesButton(),
            inprint: new ImpressumButton()
        }
    }

    #createOverlays() {
        return {
            hero: document.querySelector('overlay-hero'),
            ctrl: document.querySelector('overlay-controls'),
            rules: document.querySelector('overlay-rules'),
            inprint: document.querySelector('overlay-inprint'),
            landscape: document.querySelector('overlay-landscape')
        }
    }

    #createCloseButtons() {
        return {
            ctrl: new ControlsCloseButton(),
            rules: new RulesCloseButton(),
            inprint: new ImpressumCloseButton()
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
    /** Action after start game. */
    start() {
        this.#running = true;
    }

    /** Actions after end game. */
    stop() {
        this.#running = false;
    }

    /**
     * Opens an overlay.
     * @param {string} name - Name of overlay
     */
    openOverlay(name) {
        if (!Object.keys(this.overlays).includes(name)) return;
        this.hideControlButtons();
        Object.entries(this.overlays).forEach(([olName, ol]) => {
            if (olName == name) ol.show();
            else ol.hide();
        });
    }

    /**
     * Closes an overlay.
     * @param {string} name - Name of overlay.
     */
    closeOverlay(name) {
        if (!Object.keys(this.overlays).includes(name)) return;
        this.overlays[name].hide();
        if (name != 'hero' && !this.#running)
            this.overlays.hero.show();
        if (!this.#running) this.showControlButtons();
    }

    /**
     * Checkes if user has Portait-Mode.
     * @returns {boolean}
     */
    #isPortrait() {
        return window.innerWidth / window.innerHeight <= 1;
    }

    /** Opens and closes landscape overlay. */
    #checkPortait() {
        if (this.#isPortrait()) this.openOverlay('landscape');
        else this.closeOverlay('landscape');
    }
    // #endregion

    #addResizeEvent() {
        window.addEventListener('resize', () => {
            clearTimeout(this.#resizeTimer);
            this.#resizeTimer = setTimeout(() => {
                this.#checkPortait();
            }, 700);
        });
    }
}