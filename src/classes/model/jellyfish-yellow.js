import { NormalJellyFish } from "../abstract/jelly-normal.js";
import { ImgHelper } from "../helper/img-helper.js";

/** A jelly fish wich is yellow. */
export class YellowJellyFish extends NormalJellyFish {
    /**
     * Creats a yellow jelly fish.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} minY - Minimum Y-Pos of object.
     * @param {number} maxY - Maximum Y-Pos of object.
     */
    constructor(x, y, minY, maxY) {
        super(x, y, minY, maxY)
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.ENEMY["jellyfish/yellow/swim"][0]));
        this.animations.swim.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["jellyfish/yellow/swim"]));
        this.animations.dead.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["jellyfish/yellow/dead"]));
    }
}