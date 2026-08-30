/**
 * A Element lays over the main content.
 * @extends HTMLElement
 */
export class Overlay extends HTMLElement {
    /**
     * Name of overlay.
     * @type {string}
     */
    #name
    /**
     * Visibility of overlay.
     * @type {boolean}
     */
    #visible;

    /**
     * Creates an overlay.
     * @param {string} name - Name of overlay.
     * @param {boolean} visible - Visbility of overlay.
     */
    constructor(name, visible = false) {
        super();
        this.#name = name;
        this.visible = visible;
    }

    get name() { return this.#name; }

    get visible() { return this.#visible; }

    set visible(state) {
        if ( typeof state != 'boolean') return;
        this.classList.toggle('transparent', !state);
        this.classList.toggle('z-1', state);
        this.#visible = state;
    }

    /** Shows this overlay. */
    show() {
        this.visible = true;
    }

    /** Hides this overlay. */
    hide() {
        this.visible = false;
    }
}