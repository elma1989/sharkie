import { CollidingObject } from "./colliding-object.js";

/**
 * Respesents an object, which can move.
 * @typedef {import('../types.js').Offset} Offset
 */

export class MovableObject extends CollidingObject {
    /**
     * Creates a movable object.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} width - Width of object.
     * @param {number} height - Height of object.
     * @param {Offset} offset - Offset of object.
     */
    constructor(x, y, width, height, offset) {
        super(x, y, width, height, offset);
    }

    /**
     * Updates an object.
     * @param {number} deltatime - Time to next frame in ms.
     */
    update(deltatime) {

    }

    /**
     * Updates movment of an object.
     * @param {number} deltatime - Time to next frame in ms.
     */
    updateMovement(deltatime) {

    }
}