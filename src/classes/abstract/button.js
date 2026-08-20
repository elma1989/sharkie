import { HTMLCustomElement } from "./custom-element.js";

/** Usage of any Buttons. */
export class Button extends HTMLCustomElement {
    #disabled;

    /**
     * Creates a Button-Element.
     * @param {string} id - ID of Button.
     * @param {boolean} disabled - True, if disabled (Default: false)
     * @param {boolean} visible - True, if it should be visible (Default: true)
     */
    constructor(id, disabled = false, visible = true) {
        super(id, visible);
        this.disabled = disabled;
        this.#addPointerEvents();
    }

    get disabled() { return this.#disabled; }

    set disabled(state) {
        if (typeof state != 'boolean' || !this.element) return;
        this.element.toggleAttribute('disabled', state);
        this.element.classList.toggle('waiting', state);
        this.#disabled = state;
    }

    /** Adds all pointer events. */
    #addPointerEvents() {
        const btn = this.element;
        if (!btn) return;
        btn.addEventListener('pointerdown', () => this.onPointerDown?.());
        btn.addEventListener('pointerup', () => this.onPointerUp?.());
    }
}