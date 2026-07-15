import { Screen } from "../abstract/screen.js";
import { ImgHelper } from "../helper/img-helper.js";

export class LoseScreen extends Screen {
    constructor() {
        super(1335, 187);
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.SCREEN.lose));
    }
}