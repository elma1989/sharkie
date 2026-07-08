import { Bubble } from "../abstract/bubble.js";
import { ImgHelper } from "../helper/img-helper.js";

/**
 * @typedef {import('../types.js').Direction} Direction
 */

/** Represents a noraml bubble. */
export class NormalBubble extends Bubble {
    /**
     * Creates a normal bubble.
     * @param {Direction} direction - Direction of bubble;
     */
    constructor(direction) {
        super(direction);
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.sharkie["bubble/normal"]));
    }
}