import { Background } from "../../abstract/background.js";
import { ImgHelper } from "../../helper/img-helper.js";

/**
 * It's the second layer obove water.
 * @extends Background
 */
export class Layer1 extends Background {
    /**
     * Creates a layer1-background.
     * @param {number} offset - Offset of layer1-background.
     */
    constructor(offset) {
        super(offset);
    }

    /**
     * Loads the layer1.
     * @override
     */
    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.BACKGROUND.layer1[this.offset % 2]));
    }
}