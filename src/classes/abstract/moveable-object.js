import { GameConfig } from "../game-config.js";
import { CollidingObject } from "./colliding-object.js";

/**
 * Respesents an object, which can move.
 * @typedef {import('../types.js').Offset} Offset
 */

export class MovableObject extends CollidingObject {
    #mirorHorizontally = false;

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

    get mirrorHorzontally() { return this.#mirorHorizontally; }

    set mirrorHorzontally(state) {
        if (typeof state != 'boolean') return;
        if (state == this.mirrorHorzontally) return;
        this.#mirorHorizontally = state;
    }

    draw(ctx) {
        if (this.mirrorHorzontally) {
            ctx.save();
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(this.img, -this.x, this.y, this.width, this.height);
            ctx.restore();
        } else super.draw(ctx);
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