import { TitleOverlay } from "../abstract/overlay-title.js";

/**
 * An overlay for impressum.
 * @extends TitleOverlay
 */
export class ImpressumOverlay extends TitleOverlay {
    constructor() {
        super('inprint', 'Impressum');
    }
}

customElements.define('overlay-inprint', ImpressumOverlay);