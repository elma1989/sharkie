import { PufferFish } from "../abstract/puffer-fish.js";
import { ImgHelper } from "../helper/img-helper.js";

/** A puffer fish which is pink */
export class PinkPufferFish extends PufferFish {
    /**
     * Createts a pink puffer fish.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} minX - Minimum X-Pos of oject.
     * @param {number} maxX - Maximum X-Pos of oject.
     */
    constructor(x, y, minX, maxX) {
        super(x, y, minX, maxX);
    }

    async load() {
        const [empty, transition, full, ...dead] = await Promise.all([
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/pink/swim/empty"])),
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/pink/swim/transition"])),
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/pink/swim/full"])),
            this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/pink/dead/empty"])),
            this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/pink/dead/transition"])),
            this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/pink/dead/full"]))
        ]);
        this.animations['swim/empty'].frames = empty;
        this.animations['swim/transition'].frames = transition;
        this.animations['swim/full'].frames = full;
        this.deathImg.empty = dead[0];
        this.deathImg.transition = dead[1];
        this.deathImg.full = dead[2];
        this.img = empty[0];
    }
}