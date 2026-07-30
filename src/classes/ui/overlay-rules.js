import { TitleOverlay } from "../abstract/overlay-title.js";

/** An overlay for the game rules */
export class RulesOverlay extends TitleOverlay {
    constructor() {
        super('rules', 'Game-Rules');
    }
}

customElements.define('overlay-rules', RulesOverlay);