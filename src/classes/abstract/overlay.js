/** A Element lays over the main content. */
export class Overlay extends HTMLElement {
    #name
    #visible;

    /**
     * Creates an overlay.
     * @param {string} name - Name of overlay.
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