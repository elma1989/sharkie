import { LeftStatusbar } from "../../abstract/statusbar-left.js";
import { ImgHelper } from "../../helper/img-helper.js";

/**
 * Shows user collected poisonous jars.
 * @extends LeftStatusbar
 */
export class PoisonBar extends LeftStatusbar {
    constructor() {
        super(240, 100);
    }

    async load() {
        this.stats = await this.loadImages(ImgHelper.urls(ImgHelper.STATUS.posion));
        this.img = this.stats[0];
    }
}