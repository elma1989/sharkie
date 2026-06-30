import { AnimatedObject } from "./animatad-object.js";

/**
 * @typedef {import('../types.js').Offset} Offset
 * @typedef {import('../types.js').Animation} Animation
 */

/** An animattaed object alive. */
export class HealthyObject extends AnimatedObject {
    #health = 100;

    /**
     * Creats a healthy object.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} width - Width of object.
     * @param {number} height - Height of object.
     * @param {Offset} offset - Offeset of object.
     * @param {Object.<string,Animation>} animaitons - Animations of Object.
     */
    constructor(x, y, width, height, offset, animaitons) {
        super(x, y, width, height, offset, animaitons)
    }
}