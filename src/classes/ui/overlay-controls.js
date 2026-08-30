import { TitleOverlay } from "../abstract/overlay-title.js";

/**
 * An overlay for controls.
 * @extends TitleOverlay
 */
export class ControlsOverlay extends TitleOverlay {
    constructor() {
        super('ctrl', 'Controls');
    }
}

customElements.define('overlay-controls', ControlsOverlay);