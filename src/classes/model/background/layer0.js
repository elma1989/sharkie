import { Background } from '../../abstract/background.js';
import { ImgHelper } from '../../helper/img-helper.js';

/**
 * It's the first layer above water.
 * @extends Background
 */
export class Layer0 extends Background {
    /**
     * Creates a first layer.
     * @param {number} offset - Offset of layer0-background.
     */
    constructor(offset) {
        super(offset);
    }

    /**
     * Loads the first layer.
     * @override
     */
    async load() {
        try {
            this.img = await this.loadImage(ImgHelper.url(ImgHelper.BACKGROUND.layer0[this.offset % 2]));
        } catch (e) {
            console.error(e);
        }
    }
}