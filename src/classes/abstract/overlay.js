/** A Element lays over the main content. */
export class Overlay extends HTMLElement {
    #name
    #title;
    #visible;

    /**
     * Creates an overlay.
     * @param {string} name - Name of overlay.
     * @param {string} title - Title of overlay.
     */
    constructor(name, title) {
        super();
        this.#name = name;
        this.#title = title;
    }

    get name() { return this.#name; }

    get title() {return this.#title; }

    get visible() { return this.#visible; }

    set visible(state) {
        if ( typeof state != 'boolean') return;
        this.classList.toggle('transparent', !state);
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

    connectedCallback() {
        this.hide();
    }
}