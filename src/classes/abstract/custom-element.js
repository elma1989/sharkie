/** Custonised use of HTMLElements. */
export class HTMLCustomElement {
    #elem;
    #visible;

    /**
     * Creates a instnce for a HTML-Element.
     * @param {string} id - ID of HTML-Element.
     * @param {boolean} visible True if visible (Default: true).
     */
    constructor(id, visible = true) {
        this.#elem = document.getElementById(id);
        this.visible = visible;
    }

    get element() { return this.#elem; }

    get visible() { return this.#visible; }

    set visible(state) {
        if (typeof state != 'boolean' || !this.element) return;
        this.element.classList.toggle('d-none', !state);
        this.#visible = state;
    }
}