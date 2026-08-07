import { Bubble } from "../abstract/bubble.js";
import { ImgHelper } from "../helper/img-helper.js";

/** Represents a noraml bubble. */
export class NormalBubble extends Bubble {

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.sharkie["bubble/normal"]));
    }
}