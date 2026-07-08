import { NormalJellyFish } from "../abstract/jelly-normal.js";
import { ImgHelper } from "../helper/img-helper.js";

/** A jelly fish, which is purple */
export class PurpleJellyFish extends NormalJellyFish {
    /**
     * Creates a purple jelly fish.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} minY - Minimum Y-Pos of object.
     * @param {number} maxY - Maximum Y-Pos of object.
     */
    constructor(x, y, minY, maxY) {
        super(x, y, minY, maxY);
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.ENEMY["jellyfish/purple/swim"][0]));
        this.animations.swim.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["jellyfish/purple/swim"]));
        this.animations.dead.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["jellyfish/purple/dead"]));
    }
}