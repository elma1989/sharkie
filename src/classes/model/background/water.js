import { Background } from "../../abstract/background.js";
import { ImgHelper } from "../../helper/img-helper.js";

/** 
 * Represents the water-background.
 * @extends Background
 */
export class Water extends Background {
    /**
     * Creates water backbround.
     * @param {number} offset - Offset of water.
     */
    constructor (offset) {
        super(offset);
    }

    /**
     * Loads the water background.
     * @override
     */
    async load() {
        try {
            this.img = await this.loadImage(ImgHelper.url(ImgHelper.BACKGROUND.water[this.offset % 2]));
        } catch (e) { console.error(e); }
    }
}