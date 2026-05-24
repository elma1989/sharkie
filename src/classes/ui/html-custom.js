export class HTMLCustomElement {
    #element;
    #visible = false;
    #transparent = false;

    /**
     * Creates an HTML-Element.
     * @param {string} id - Id of element.
     * @param {boolean} visible - true, if visile (default: true)
     * @param {boolean} transparent - true, if transparent (default: false)
     */
    constructor(id, visible = true, transparent = false) {
        this.#element = document.getElementById(id);
        this.visible = visible;
        this.transparent = transparent;
    }

    get element() { return this.#element; }

    get visible() { return this.#visible; }

    set visible(state) {
        if (this.element) {
            this.element.classList.toggle('d-none', !state);
            this.#visible = state;
        }
    }

    get transparent() { return this.#transparent; }

    set transparent(state) {
        if (this.element) {
            this.element.classList.toggle('transparent', state);
            this.#transparent = state;
        }
    }

    /** Show an Element. */
    show() { this.visible = true; }

    /** Hides an Element. */
    hide() { this.visible = false; }

    /** Makes an Element transprent. */
    setTranspartent() { this.transparent = true; }

    /** Makes an Elemnt visible again. */
    setUntranparent() { this.transparent = false; }
}