import { Button } from './button.js';

/** A button, which has a text description. */
export class TextButton extends Button {
    #description;

    /**
     * Creates a text button.
     * @param {strring} id - ID of button.
     * @param {string} description - Description of button
     * @param {boolean} disabled - True for disabled button (Default: false)
     * @param {visible} visible - True if it should be visible (Default: true)
     */
    constructor(id, description, disabled = false, visible = true) {
        super(id, disabled, visible);
        this.description = description;
    }

    get description() { return this.#description; }

    set description(desc) {
        if (typeof desc != 'string' || !this.element) return;
        this.element.innerText = desc;
        this.#description = Text;
    }
}