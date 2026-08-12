import { ControlButton } from "../abstract/button-ctrl.js";

export class RightControlButton extends ControlButton {
    constructor() {
        super('btn-mobctrl-right');
    }

    async load() {
        this.icons = await this.loadIcons('right');
        this.active = false;
    }
}