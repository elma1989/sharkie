import { LeftStatusbar } from "../../abstract/statusbar-left.js";
import { ImgHelper } from "../../helper/img-helper.js";

/**
 * Shows user collected coins.
 * @extends LeftStatusbar
 */
export class CoinBar extends LeftStatusbar {
    constructor() {
        super(120, 0);
    }

    /**
     * Loads images for coin bar.
     * @override
     */
    async load() {
        this.stats = await this.loadImages(ImgHelper.urls(ImgHelper.STATUS.coin));
        this.img = this.stats[0];
    }
}