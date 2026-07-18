import { LeftStatusbar } from "../../abstract/statusbar-left.js";
import { ImgHelper } from "../../helper/img-helper.js";

/** Shows user collected poisonous jars. */
export class PoisonBar extends LeftStatusbar {
    constructor() {
        super(240, 100);
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.STATUS.posion[0]));
        this.stats = await this.loadImages(ImgHelper.urls(ImgHelper.STATUS.posion));
    }
}