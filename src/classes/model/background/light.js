import { Background } from "../../abstract/background.js";
import { ImgHelper } from "../../helper/img-helper.js";

/**
 * It's the sun light above the water.
 * @extends Background
 */
export class Light extends Background {
    /**
     * Creates light-background.
     * @param {number} offset - Offset for light-background.
     */
    constructor(offset) {
        super(offset);
    }

    /**
     * Loads the light-background.
     * @override
     */
    async load() {
        try {
            this.img = await this.loadImage(ImgHelper.url(ImgHelper.BACKGROUND.light[(this.offset - 1) % 2]));
        } catch(e) {
            console.error(e);
        }
    }
}