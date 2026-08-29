import { PufferFish } from "../../abstract/puffer-fish.js";
import { ImgHelper } from "../../helper/img-helper.js";

/**
 * A puffer fish, which is orange.
 * @extends PufferFish
 */
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

    /**
     * Loads images for orange puffer fish.
     * @override
     */
    async load() {
        const [empty, transition, full, ...dead] = await Promise.all([
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/orange/swim/empty"])),
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/orange/swim/transition"])),
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["pufferfish/orange/swim/full"])),
            this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/orange/dead/empty"])),
            this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/orange/dead/transition"])),
            this.loadImage(ImgHelper.url(ImgHelper.ENEMY["pufferfish/orange/dead/full"]))
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