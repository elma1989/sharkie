import { Sharkie } from "../model/sharkie.js";
import { AnimatedObject } from "./animatad-object.js";

/**
 * @typedef {import('../types.js'.Offset)} Offset
 * @typedef {import('../types.js'.Animation)} Animaiton
 */

/** An Animated object, which can be collected. */
export class Collectable extends AnimatedObject {
    /**
     * Creates an collectable object.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} width - Width of object.
     * @param {number} height - Height of object.
     * @param {Offset} offset - Offset of object.
     * @param {Object.<string,Animation>} animations - Animations of object.
     */
    constructor(x, y, width, height, offset, animations) {
        super(x, y, width, height, offset, animations);
    }

    updateAnimation(timedelta) {
        this.animationTimer += timedelta;
        const duration = this.durationFrame;
        if (this.animationTimer >= duration) {
            this.playAnimation('idle');
            this.animationTimer -= duration;
        }
    }

    /**
     * Will be executed on collision with sharkie.
     * @param {Sharkie} skarkie - Instanz of sharkie.
     */
    collect(skarkie) {
        this.onCollect?.();
    }
}