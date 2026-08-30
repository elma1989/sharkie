import { Overlay } from "../abstract/overlay.js";

/**
 * The first overlay after load.
 * @extends Overlay
 */
export class HeroOverlay extends Overlay {
    constructor() {
        super('hero', true);
    }
}

customElements.define('overlay-hero', HeroOverlay);