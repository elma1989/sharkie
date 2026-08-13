import { ControlButton } from "./abstract/button-ctrl.js";

export class SlapControlButton extends ControlButton {
    constructor() {
        super('btn-mobctrl-slap');
    }

    async load() {
        this.icons = await this.loadIcons('attackSlap');
        this.active = false;
    }
}