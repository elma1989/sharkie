import { IconButton } from "./button-icon.js";

export class ControlButton extends IconButton {
    /**
     * Creates control-button.
     * @param {string} id - Id of button.
     */
    constructor(id) {
        super(id);
        this.#addPointerUpEvent();
    }

    #addPointerUpEvent() {
        this.element?.addEventListener('pointerup', () => this.onPointerUp?.());
    }
}