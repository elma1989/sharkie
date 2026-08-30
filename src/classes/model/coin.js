import { Collectable } from "../abstract/collectable.js";
import { ImgHelper } from "../helper/img-helper.js";
import { Sharkie } from "./sharkie.js";

/** 
 * Represents a coin to money on collect.
 * @extends Collectable
 */
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

    /**
     * Loads a coin.
     * @override
     */
    async load() {
        this.animations.idle.frames = await this.loadImages(ImgHelper.urls(ImgHelper.COLLECTABLE.coin));
        this.img = this.animations.idle.frames[0];
    }

    /**
     * Actoins for collect of coin.
     * @param {Sharkie} sharkie - Main-character for execute any actions.
     */
    collect(sharkie) {
        if (!sharkie instanceof Sharkie) return;
        sharkie.addCoin();
    }
}   