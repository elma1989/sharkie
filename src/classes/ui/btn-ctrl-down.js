import { ControlButton } from "../abstract/button-ctrl.js"

export class DownControlButton extends ControlButton {
    constructor() {
        super('btn-mobctrl-down');
    }

    async load() {
        this.icons = await this.loadIcons('down');
        this.active = false;
    }
}