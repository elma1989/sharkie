import { NormalJellyFish } from "../../abstract/jelly-normal.js";
import { ImgHelper } from "../../helper/img-helper.js";

/**
 * A jelly fish, which is purple.
 * @extends NormalJellyFish
 */
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

    /**
     * Loads images for purple yelly fish.
     * @overide
     */
    async load() {
        const [swim, dead] = await Promise.all([
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["jellyfish/purple/swim"])),
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["jellyfish/purple/dead"]))
        ]);
        this.animations.swim.frames = swim;
        this.animations.dead.frames = dead;
        this.img = swim[0];
    }
}