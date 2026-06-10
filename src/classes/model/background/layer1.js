import { Background } from "../../abstract/background.js";
import { ImgHelper } from "../../helper/img-helper.js";

export class Layer1 extends Background {
    constructor(offset) {
        super(offset);
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.background.layer1[this.offset % 2]));
    }
}