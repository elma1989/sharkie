import { Collectable } from "../abstract/collectable.js";
import { ImgHelper } from "../helper/img-helper.js";
import { Sharkie } from "./sharkie.js";

/**
 * Represents a poisonous jar to collect.
 * Nessary for poisonous bubbles.
 * @extends Collectable
 */
export class PoisonousJar extends Collectable {
    /**
     * Creates a poisonous jar.
     * @param {number} x - X-Pos of jar.
     * @param {number} y - Y-Pos of jar.
     */
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
        });
    }

    /**
     * Loads a poisonous jar.
     * @override
     */
    async load() {
        this.animations.idle.frames = await this.loadImages(ImgHelper.urls(ImgHelper.COLLECTABLE.poison));
        this.img = this.animations.idle.frames[0];
    }

    /**
     * Collect-action for poisonous jar.
     * @override
     * @param {Sharkie} sharkie - Main-character for action. 
     */
    collect(sharkie) {
        if (!sharkie instanceof Sharkie) return;
        sharkie.addPoisonousJar();
    }
}