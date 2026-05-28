import { Barrier } from "../abstract/barrier.js";
import { GameConfig } from "../game-config.js";
import { ImgHelper } from "../helper/img-helper.js";

export class TopButtomBarrier extends Barrier {
    constructor() {
        super(GameConfig.WIDTH + 100, 0, 1682, GameConfig.HEIGHT);
    }

    async load() {
        try {
            this.img = await this.loadImage(ImgHelper.url(ImgHelper.background.barrier.topButton));
        } catch(e) {
            console.error(e);
        }
    }
}