import { Background } from "../../abstract/background.js";
import { ImgHelper } from "../../helper/img-helper.js";

export class Floor extends Background {
    constructor(offset) {
        super(offset);
    }

    async load() {
        try {
            this.img = await this.loadImage(ImgHelper.url(ImgHelper.background.floor[this.offset % 2]));
        } catch (e) {
            console.error(e);
        }
    }
}