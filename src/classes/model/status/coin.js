import { LeftStatusbar } from "../../abstract/statusbar-left.js";
import { ImgHelper } from "../../helper/img-helper.js";

/** Shows user collected coins. */
export class CoinBar extends LeftStatusbar {
    constructor() {
        super(120, 0);
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.STATUS.coin[0]));
        this.stats = await this.loadImages(ImgHelper.urls(ImgHelper.STATUS.coin));
    }
}