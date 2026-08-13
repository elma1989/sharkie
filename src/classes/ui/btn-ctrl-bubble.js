import { ControlButton } from "../abstract/button-ctrl.js";

export class BubbleControlButton extends ControlButton {
    constructor() {
        super('btn-mobctrl-bubble');
    }

    async load() {
        this.icons = await this.loadIcons('attackBubble');
        this.active = false;
    }
}