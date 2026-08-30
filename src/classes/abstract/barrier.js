import { CollidingObject } from "./colliding-object.js";

/** 
 * Represents a barrier, where Sharkie can never swim.
 * @extends CollidingObject
 */
export class Barrier extends CollidingObject {
    
    /**
     * Creates a colliding object.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} width - Width of object.
     * @param {number} height - Height of object
     * @param {Offset} offset - Offset of object.
     */
    constructor(x, y, width, height, offset) {
        super(x, y, width, height, offset);
    }
}