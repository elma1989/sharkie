import { IconButton } from "../abstract/button-icon.js";
import { ImgHelper } from "../helper/img-helper.js";

/** An icon button for switch music. */
export class MusicButton extends IconButton {
    constructor() {
        super('btn-music');
    }

    async load(music) {
        this.icons = await this.loadIcons('music');
        this.active = music;
    }
}