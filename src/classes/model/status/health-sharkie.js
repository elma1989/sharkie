import { LeftStatusbar } from "../../abstract/statusbar-left.js";
import { ImgHelper } from "../../helper/img-helper.js";

/** 
 * A statusbar for Sharkie's health.
 * @extends LeftStatusbar
 */
export class SharkieHealthBar extends LeftStatusbar {
    constructor() {
        super(0, 100);
    }

    /**
     * Loads images for Sharkie's health bar.
     * @override
     */
    async load() {
        this.stats = await this.loadImages(ImgHelper.urls(ImgHelper.STATUS["health/sharkie"]));
        this.img = this.stats[5];
    }
}