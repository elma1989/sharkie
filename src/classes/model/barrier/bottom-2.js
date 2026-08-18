import { Barrier } from "../../abstract/barrier.js";
import { GameConfig } from "../../game-config.js";
import { ImgHelper } from "../../helper/img-helper.js";

export class SecondBottomBarrier extends Barrier {
    constructor() {
        const height = 649;
        super(2 * GameConfig.WIDTH + 200, GameConfig.HEIGHT - height, 1415, height, {
            top: 100,
            right: 100,
            bottom: 0,
            left: 300
        });
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.background.barrier.bottom));
    }
}