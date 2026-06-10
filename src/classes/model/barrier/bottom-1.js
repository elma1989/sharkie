import { Barrier } from "../../abstract/barrier.js";
import { GameConfig } from "../../game-config.js";
import { ImgHelper } from "../../helper/img-helper.js";

export class FirstBottomBarrier extends Barrier {
    constructor() {
            super(GameConfig.WIDTH + 100, 0, 1682, 1080, {
                top: 800,
                right: 0,
                bottom: 0,
                left: 0
            })
        }
    
        async load() {
            this.img = await this.loadImage(ImgHelper.url(ImgHelper.background.barrier.topButton));
        }
}