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
        const [empty, transsition, full, ...dead] = await Promise.all([
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/green/swim/empty"])),
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/green/swim/transition"])),
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/green/swim/full"])),
            this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/green/dead/empty"])),
            this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/green/dead/transition"])),
            this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/green/dead/full"]))
        ]);
        this.animations['swim/empty'].frames = empty;
        this.animations['swim/transition'].frames = transsition;
        this.animations['swim/full'].frames = full;
        this.deathImg.empty = dead[0];
        this.deathImg.transition = dead[1];
        this.deathImg.full = dead[2];
        this.img = empty[0];
    }
}