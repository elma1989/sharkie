import { Collectable } from "../abstract/collectable.js";
import { ImgHelper } from "../helper/img-helper.js";
import { Sharkie } from "./sharkie.js";

/**
 * @typedef {import('../types.js').Offset} Offset
 * @typedef {import('../types.js').Animation} Animation
 */

/** Represents a coin to money on collect. */
export class Coin extends Collectable {
    /**
     * Creates a coin.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     */
    constructor(x, y) {
        super(x, y, 99, 93, {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }, {
            'idle': {
                frames: [],
                duration: 1500,
                loop: true
            }
        });
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.COLLECTABLE.coin[0]));
        this.animations.idle.frames = await this.loadImages(ImgHelper.urls(ImgHelper.COLLECTABLE.coin));
    }

    collect(sharkie) {
        if (!sharkie instanceof Sharkie) return;
        sharkie.addCoin();
        this.onCollect?.();
    }
}