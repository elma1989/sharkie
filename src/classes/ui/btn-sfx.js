import { IconButton } from "../abstract/button-icon.js";

export class SfxButton extends IconButton {
    constructor() {
        super('btn-sfx');
    }

    async load(sfx) {
        this.icons = await this.loadIcons('sfx');
        this.active = sfx;
    }
}