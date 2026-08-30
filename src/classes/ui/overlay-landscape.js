import { Overlay } from "../abstract/overlay.js";

/**
 * Overlay for user's device in portrait.
 * @extends Overlay
 */
class LandscapeOverlay extends Overlay {
    constructor() {
        super('landscape');
    }
}

customElements.define('overlay-landscape', LandscapeOverlay);