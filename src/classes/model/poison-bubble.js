import { Bubble } from "../abstract/bubble.js";
import { ImgHelper } from "../helper/img-helper.js";

export class PoisonousBubble extends Bubble {
    constructor(x, y, direction) {
        super(x, y, direction);
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.sharkie["bubble/poison"]));
    }
}