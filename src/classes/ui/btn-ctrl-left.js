import { ControlButton } from "../abstract/button-ctrl.js";

export class LeftControlButton extends ControlButton {
    constructor() {
        super('btn-mobctrl-left');
    }

    async load() {
        this.icons = await this.loadIcons('left');
        this.active = false;
    }
}