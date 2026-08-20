import { ImgHelper } from "../helper/img-helper.js";
import { Button } from "./button.js";

/** Abutton which has two icon for on and off. */
export class IconButton extends Button {
    #active;

    /**
     * Creates an icon button
     * @param {string} id - Id of HTML-Element
     */
    constructor(id) {
        super(id, false);
        this.#active = true;
    }

    get active() { return this.#active; }

    set active(state) {
        if (typeof state != 'boolean' || !this.element) return;
        const icons = this.element.children;
        if (state) {
            icons[0].classList.add('d-none');
            icons[1].classList.remove('d-none');
        } else {
            icons[0].classList.remove('d-none');
            icons[1].classList.add('d-none');
        }
        if (this.active != state) this.onChange?.(state);
        this.#active = state;
    }

    /** Changes active state. */
    toggle() {
        this.active = !this.active;
    }
}