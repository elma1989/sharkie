import { Overlay } from "../abstract/overlay.js";
import { Template } from "../helper/template.js";

/** An overlay for controls. */
export class ControlsOverlay extends Overlay {
    constructor() {
        super('ctrl', 'Controls');
    }

    connectedCallback() {
        super.connectedCallback();
        const children = this.innerHTML;
        this.innerHTML = Template.overlay(this.name, this.title, children);
    }
}

customElements.define('overlay-controls', ControlsOverlay);