import { Barrier } from "../../abstract/barrier.js";
import { GameConfig } from "../../game-config.js";
import { ImgHelper } from "../../helper/img-helper.js";

/** 
 * It's the first barrier on the bottom.
 * @extends Barrier
 */
export class FirstBottomBarrier extends Barrier {
    constructor() {
            super(GameConfig.WIDTH + 100, 0, 1682, 1080, {
                top: 800,
                right: 100,
                bottom: 0,
                left: 0
            })
        }
    
        /**
         * Loads the first-bottom-barrier.
         * @override
         */
        async load() {
            this.img = await this.loadImage(ImgHelper.url(ImgHelper.BACKGROUND.barrier.topButton));
        }
}