import { Overlay } from "../abstract/overlay.js";

/** An overlay for impressum */
export class ImpressumOverlay extends Overlay {
    constructor() {
        super('inprint', 'Impressum');
    }
}

customElements.define('overlay-inprint', ImpressumOverlay);