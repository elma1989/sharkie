import { Bubble } from "../abstract/bubble.js";
import { ImgHelper } from "../helper/img-helper.js";

/** A bubble, which is poisonous */
export class PoisonousBubble extends Bubble {

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.sharkie["bubble/poison"]));
    }
}