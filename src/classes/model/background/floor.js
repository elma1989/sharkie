import { Background } from "../../abstract/background.js";
import { ImgHelper } from "../../helper/img-helper.js";


/**
 * It's the bottom of aquarium.
 * @extends Background
 */
export class Floor extends Background {
    /**
     * Creates floor-background.
     * @param {number} offset - Offset for floor-background.
     */
    constructor(offset) {
        super(offset);
    }

    /**
     * Loads floor-background.
     * @override
     */
    async load() {
        try {
            this.img = await this.loadImage(ImgHelper.url(ImgHelper.BACKGROUND.floor[this.offset % 2]));
        } catch (e) {
            console.error(e);
        }
    }
}