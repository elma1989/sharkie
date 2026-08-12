import { ControlButton } from "../abstract/button-ctrl.js";

export class UpControlButton extends ControlButton {
    constructor() {
        super('btn-mobctrl-up');
    }

    async load() {
        this.icons = await this.loadIcons('up');
        this.active = false;
    }
}