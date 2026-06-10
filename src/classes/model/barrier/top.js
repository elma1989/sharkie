import { Barrier } from "../../abstract/barrier.js";
import { GameConfig } from "../../game-config.js";
import { ImgHelper } from "../../helper/img-helper.js";

export class TopBarrier extends Barrier {
    constructor() {
        super(GameConfig.WIDTH + 100, 0, 1682, 1080, {
            top: 0,
            right: 0,
            bottom: 900,
            left: 0
        })
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.background.barrier.topButton));
    }
}