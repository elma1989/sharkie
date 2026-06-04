import { Barrier } from "../abstract/barrier.js";
import { GameConfig } from "../game-config.js";
import { ImgHelper } from "../helper/img-helper.js";

export class RightBarrier extends Barrier {
    constructor() {
        super(4 * GameConfig.WIDTH - 341, GameConfig.HEIGHT - 906, 441, 906, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 50
        });
    }

    async load() {
        try {
            this.img = await this.loadImage(ImgHelper.url(ImgHelper.background.barrier.right));
        } catch (e) {
            console.error(e);
        }
    }
}