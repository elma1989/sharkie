import { Barrier } from "../abstract/barrier.js";
import { GameConfig } from "../game-config.js";
import { ImgHelper } from "../helper/img-helper.js";

export class RightBarrier extends Barrier {
    constructor() {
        super(4 * GameConfig.WIDTH - 341, GameConfig.HEIGHT - 906, 441, 906);
    }

    async load() {
        try {
            this.img = await this.loadImage(ImgHelper.url(ImgHelper.background.barrier.right));
        } catch (e) {
            console.error(e);
        }
    }
}