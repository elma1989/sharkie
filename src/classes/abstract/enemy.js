import { HealthyObject } from "./healty-object.js";

/**
 * @typedef {import('../types.js').Offset} Offset
 * @typedef {import('../types.js').Animation} Animaiton
 * @typedef {import('../types.js').Direction} Direction
 * @typedef {import('../types.js').Limits} Limits
 */

/** An evil healthy object. */
export class Enemy extends HealthyObject {
    #direction;
    #limits;

    /**
     * Creates an enemy.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} width - Width of object.
     * @param {number} height - Height of object.
     * @param {Offset} offset - Offset of object.
     * @param {Object.<string,Animaiton>} animations - Animations of object.
     * @param {Direction} direction - Direction to which object starts to move.
     * @param {Limits} limits - Limits for movement of object.
     */
    constructor(x, y, width, height, offset, animations, direction, limits) {
        super(x, y, width, height, offset, animations);
        this.#direction = direction;
        this.#limits = limits;
    }
}