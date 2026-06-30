import { PufferFish } from "../abstract/puffer-fish.js";
import { ImgHelper } from "../helper/img-helper.js";

/** A puffer fish, which is green. */
export class GreenPufferFish extends PufferFish {
    
    /**
     * Creates a green puffer fish.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} minX - Minimum X-Pos of object.
     * @param {number} maxX - Maximum X-Pos of object.
     */
    constructor(x, y, minX, maxX) {
        super(x, y, minX, maxX);
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/green/swim/empty"][0]));
        this.deathImg.empty = await this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/green/dead/empty"]));
        this.deathImg.transition = await this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/green/dead/transition"]));
        this.deathImg.full = await this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/green/dead/full"]));
        this.animations['swim/empty'].frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/green/swim/empty"]));
        this.animations['swim/transition'].frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/green/swim/transition"]));
        this.animations['swim/full'].frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/green/swim/full"]));
    }
}