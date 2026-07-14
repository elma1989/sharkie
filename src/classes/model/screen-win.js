import { Screen } from "../abstract/screen.js";
import { ImgHelper } from "../helper/img-helper.js";

export class WinScreen extends Screen {
    constructor() {
        super(896, 193);
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.SCREEN.win));
    }
}