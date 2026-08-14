import { ImgHelper } from "../helper/img-helper.js";
import { Button } from "./button.js";

/** Abutton which has two icon for on and off. */
export class IconButton extends Button {
    #icons;
    #active;

    /**
     * Creates an icon button
     * @param {string} id - Id of HTML-Element
     */
    constructor(id) {
        super(id, false);
        this.#icons = null;
        this.#active = true;
    }

    get icons() { return this.#icons; }

    set icons (icons) {
        const keys = Object.keys(icons);
        if (!keys.includes('on') || !keys.includes('off')) return;
        this.#icons = icons;
    }

    get active() { return this.#active; }

    set active(state) {
        if (typeof state != 'boolean' || !this.element) return;
        const key = state ? 'on' : 'off';
        this.element.innerHTML = '';
        this.element.appendChild(this.icons[key]);
        this.onChange?.(state);
        this.#active = state;
    }

    /** Changes active state. */
    toggle() {
        this.active = !this.active;
    }
}