import { Barrier } from "../../abstract/barrier.js";
import { GameConfig } from "../../game-config.js";
import { ImgHelper } from "../../helper/img-helper.js";

/** 
 * It's the barrier on the top.
 * @extends Barrier
 */
export class TopBarrier extends Barrier {
    constructor() {
        super(GameConfig.WIDTH + 100, 0, 1682, 1080, {
            top: 0,
            right: 0,
            bottom: 900,
            left: 0
        })
    }

    /**
     * Loads the top-barrier.
     * @override
     */
    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.BACKGROUND.barrier.topButton));
    }
}