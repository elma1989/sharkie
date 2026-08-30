import { Screen } from "../abstract/screen.js";
import { ImgHelper } from "../helper/img-helper.js";

/**
 * Scree for winning the game.
 * @extends Screen
 */
export class WinScreen extends Screen {
    constructor() {
        super(896, 193);
    }

    /**
     * Loads the image of winning scrren.
     * @override
     */
    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.SCREEN.win));
    }
}