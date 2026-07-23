import { Overlay } from "../abstract/overlay.js";

/** An overlay for controls. */
export class ControlsOverlay extends Overlay {
    constructor() {
        super('ctrl', 'Controls');
    }
}

customElements.define('overlay-controls', ControlsOverlay);