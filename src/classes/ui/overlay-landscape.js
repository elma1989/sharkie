import { Overlay } from "../abstract/overlay.js";

class LandscapeOverlay extends Overlay {
    constructor() {
        super('landscape');
    }
}

customElements.define('overlay-landscape', LandscapeOverlay);