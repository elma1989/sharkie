import { Bubble } from "../abstract/bubble.js";
import { ImgHelper } from "../helper/img-helper.js";

/**
 * Represents a normal bubble.
 * @extends Bubble
 */
export class NormalBubble extends Bubble {

    /**
     * Loads a normal bubble.
     * @override
     */
    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.SHARKIE["bubble/normal"]));
    }
}