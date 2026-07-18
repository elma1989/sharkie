import { Screen } from "../abstract/screen.js";
import { GameConfig } from "../game-config.js";
import { ImgHelper } from "../helper/img-helper.js";

/** A screen, which indluds the title. */
export class TitleScreen extends Screen {
    constructor() {
        super(GameConfig.WIDTH, GameConfig.HEIGHT);
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.SCREEN.title));
    }
}