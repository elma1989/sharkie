import { Screen } from "../abstract/screen.js";
import { ImgHelper } from "../helper/img-helper.js";

/**
 * Screen for losing the game.
 * @extends Screen
 */
export class LoseScreen extends Screen {
    constructor() {
        super(1335, 187);
    }

    /**
     * Loads the image of losing screen
     * @override
     */
    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.SCREEN.lose));
    }
}