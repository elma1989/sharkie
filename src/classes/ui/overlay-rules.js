import { Overlay } from "../abstract/overlay.js";
import { Template } from "../helper/template.js";

/** An overlay for the game rules */
export class RulesOverlay extends Overlay {
    constructor() {
        super('rules', 'Game-Rules');
    }
}

customElements.define('overlay-rules', RulesOverlay);