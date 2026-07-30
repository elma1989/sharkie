import { Overlay } from "../abstract/overlay.js";

export class HeroOverlay extends Overlay {
    constructor() {
        super('hero', true);
    }
}

customElements.define('overlay-hero', HeroOverlay);