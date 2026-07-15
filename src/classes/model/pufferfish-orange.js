import { PufferFish } from "../abstract/puffer-fish.js";
import { ImgHelper } from "../helper/img-helper.js";

/** A puffer fish, which is orange. */
export class OrangePufferFish extends PufferFish {
    /**
     * Creates a orange puffer fish.
     * @param {number} x - X-Pos of oubject.
     * @param {number} y - Y-Pos of object.
     * @param {number} minX - Minimum X-Pos of object.
     * @param {number} maxX - Maximum X-Pos of object.
     */
    constructor(x, y, minX, maxX) {
        super(x, y, minX, maxX);
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/orange/swim/empty"][0]));
        this.deathImg.empty = await this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/orange/dead/empty"]));
        this.deathImg.transition = await this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/orange/dead/transition"]));
        this.deathImg.full = await this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/orange/dead/full"]));
        this.animations['swim/empty'].frames = await this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/orange/swim/empty"]));
        this.animations['swim/transition'].frames = await this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/orange/swim/transition"]));
        this.animations['swim/full'].frames = await this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/orange/swim/full"]));
    }
}