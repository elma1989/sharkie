import { Template } from "../helper/template.js";
import { Overlay } from "./overlay.js";

/** An overlay with headline. */
export class TitleOverlay extends Overlay {
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

    #render() {
        const children = this.innerHTML;
        this.innerHTML = Template.overlay(this.name, this.#title, children);
    }

    connectedCallback() {
        this.#render();
    }
}