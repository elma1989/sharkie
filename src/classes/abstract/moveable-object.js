import { CollidingObject } from "./colliding-object.js";

export class MovableObject extends CollidingObject {
    constructor(x, y, width, height, offset) {
        super(x, y, width, height, offset);
    }

    /**
     * Updates an object.
     * @param {number} deltatime - Time to next frame in ms.
     */
    update(deltatime) {

    }
}