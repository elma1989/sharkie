import { Bubble } from "../abstract/bubble.js";
import { ImgHelper } from "../helper/img-helper.js";

/**
 * @typedef {import('../types.js').Direction} Direction
 */

/** A bubble, which is poisonous */
export class PoisonousBubble extends Bubble {
    /**
     * Creates a poisonous bubble.
     * @param {Direction} direction - Direction, in which bubble is been trown.
     */
    constructor(direction) {
        super(direction);
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.sharkie["bubble/poison"]));
    }
}