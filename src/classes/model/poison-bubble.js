import { Bubble } from "../abstract/bubble.js";
import { ImgHelper } from "../helper/img-helper.js";

/**
 * A bubble, which is poisonous.
 * @extends Bubble
 */
export class PoisonousBubble extends Bubble {

    /**
     * Loads a poisonous bubble.
     * @override
     */
    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.SHARKIE["bubble/poison"]));
    }
}