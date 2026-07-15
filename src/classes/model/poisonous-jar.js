import { Collectable } from "../abstract/collectable.js";
import { ImgHelper } from "../helper/img-helper.js";
import { Sharkie } from "./sharkie.js";

export class PoisonousJar extends Collectable {
    constructor(x, y) {
        super(x, y, 178, 243, {
            top: 130,
            right: 50,
            bottom: 30,
            left: 50
        }, {
            idle: {
                frames: [],
                duration: 1500,
                loop: true
            }
        })
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.COLLECTABLE.poison[0]));
        this.animations.idle.frames = await this.loadImages(ImgHelper.urls(ImgHelper.COLLECTABLE.poison));
    }

    collect(sharkie) {
        if (!sharkie instanceof Sharkie) return;
        sharkie.addPoisonousJar();
        this.onCollect?.()
    }
}