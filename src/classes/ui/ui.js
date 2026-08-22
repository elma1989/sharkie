import { Canvas } from "./canvas.js";

export class UI {
    #canvas;
    #mobControlAreas;
    #overlays;
    #running = false;
    #resizeTimer;

    constructor() {
        this.#canvas = new Canvas();
        this.#mobControlAreas = document.querySelectorAll('.mob-ctrl');
        this.#overlays = this.#createOverlays();
        this.#checkPortait();
        this.#addResizeEvent();
    }

    get canvas() { return this.#canvas; }

    get overlays() { return this.#overlays; }

    #createOverlays() {
        return {
            hero: document.querySelector('overlay-hero'),
            ctrl: document.querySelector('overlay-controls'),
            rules: document.querySelector('overlay-rules'),
            inprint: document.querySelector('overlay-inprint'),
            landscape: document.querySelector('overlay-landscape')
        }
    }

    // #region Button-Control
    
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