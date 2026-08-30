import { Template } from "../helper/template.js";
import { Overlay } from "./overlay.js";

/**
 * An overlay with headline and close button.
 * @extends Overlay
 */
export class TitleOverlay extends Overlay {

    /**
     * Title for headline of overlay
     * @type {string}
     */
    #title;

    /**
     * Creates a TitleOverlay.
     * @param {string} name - Name of overlay.
     * @param {string} title - Title of overlay.
     */
    constructor(name, title) {
        super(name);
        this.#title = title;
    }

    /** Will be execute after load. */
    connectedCallback() {
        const children = this.innerHTML;
        this.innerHTML = Template.overlay(this.name, this.#title, children);
    }
}