import { Statusbar } from "../../abstract/statusbar.js";
import { ImgHelper } from "../../helper/img-helper.js";

/** A statusbar for Sharkie's health. */
export class SharkieHealthBar extends Statusbar {
    constructor() {
        super(0, 0, 100);
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.STATUS["health/sharkie"][5]));
        this.stats = await this.loadImages(ImgHelper.urls(ImgHelper.STATUS["health/sharkie"]));
    }
}