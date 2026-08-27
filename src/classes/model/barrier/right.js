import { Barrier } from "../../abstract/barrier.js";
import { GameConfig } from "../../game-config.js";
import { ImgHelper } from "../../helper/img-helper.js";

/** 
 * It's the right barrier at the end of game.
 * @extends Barrier
 */
export class RightBarrier extends Barrier {
    constructor() {
        const width = 441;
        const height = 906;
        super(4 * GameConfig.WIDTH - width, GameConfig.HEIGHT - height, width, height, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 100
        })
    }

    /**
     * Loads the right barrier.
     * @override
     */
    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.BACKGROUND.barrier.right));
    }
}