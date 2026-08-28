import { Sharkie } from "../model/sharkie.js";
import { AnimatedObject } from "./animatad-object.js";

/** 
 * An Animated object, which can be collected.
 * @extends AnimatedObject
 */
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

    /**
     * Animation-loop for collectable objects.
     * @override
     */
    animationLoop() {
        this.playAnimation('idle');
    }

    /**
     * Will be executed on collision with sharkie.
     * @param {Sharkie} skarkie - Instanz of sharkie.
     */
    collect(skarkie) {}
}