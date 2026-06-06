import { Barrier } from "../abstract/barrier.js";
import { GameConfig } from "../game-config.js";
import { ImgHelper } from "../helper/img-helper.js";

export class BottomBarrier extends Barrier {
    
    constructor() {
        super(GameConfig.WIDTH * 2 + 200, GameConfig.HEIGHT - 649, 1415, 649, {
            top: 50,
            right: 0,
            bottom: 0,
            left: 0
        });
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.background.barrier.bottom));
    }
}